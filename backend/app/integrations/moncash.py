"""
MonCash Payment Integration
Official MonCash API for Haiti
"""

import httpx
import base64
from typing import Optional, Dict, Any
from datetime import datetime
from ..core.config import settings


class MonCashClient:
    """MonCash API Client for payment processing"""

    def __init__(self):
        self.client_id = settings.MONCASH_CLIENT_ID
        self.client_secret = settings.MONCASH_CLIENT_SECRET
        self.mode = settings.MONCASH_MODE

        # Base URLs
        if self.mode == "production":
            self.base_url = "https://moncashbutton.digicelgroup.com"
        else:
            self.base_url = "https://sandbox.moncashbutton.digicelgroup.com"

        self.auth_url = f"{self.base_url}/Api/oauth/token"
        self.payment_url = f"{self.base_url}/Api/v1/CreatePayment"
        self.transaction_url = f"{self.base_url}/Api/v1/RetrieveTransactionPayment"
        self.transfer_url = f"{self.base_url}/Api/v1/Transfert"

        self._access_token: Optional[str] = None
        self._token_expires_at: Optional[datetime] = None

    async def _get_access_token(self) -> str:
        """Get or refresh OAuth access token"""

        # Return cached token if still valid
        if self._access_token and self._token_expires_at:
            if datetime.now() < self._token_expires_at:
                return self._access_token

        # Create Basic Auth header
        credentials = f"{self.client_id}:{self.client_secret}"
        encoded_credentials = base64.b64encode(credentials.encode()).decode()

        headers = {
            "Authorization": f"Basic {encoded_credentials}",
            "Content-Type": "application/x-www-form-urlencoded",
        }

        data = {
            "grant_type": "client_credentials",
            "scope": "read,write",
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.auth_url,
                headers=headers,
                data=data,
            )
            response.raise_for_status()
            token_data = response.json()

        self._access_token = token_data["access_token"]
        # Token typically expires in 3600 seconds (1 hour)
        expires_in = token_data.get("expires_in", 3600)
        self._token_expires_at = datetime.now().timestamp() + expires_in

        return self._access_token

    async def create_payment(
        self,
        amount: float,
        order_id: str,
        description: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Create a payment request

        Args:
            amount: Payment amount in HTG (Haitian Gourdes)
            order_id: Unique order/booking identifier
            description: Payment description

        Returns:
            Payment details including payment token and redirect URL
        """
        token = await self._get_access_token()

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }

        payload = {
            "amount": amount,
            "orderId": order_id,
            "description": description or f"Booking #{order_id}",
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.payment_url,
                headers=headers,
                json=payload,
            )
            response.raise_for_status()
            return response.json()

    async def get_transaction_details(self, transaction_id: str) -> Dict[str, Any]:
        """
        Retrieve transaction details by transaction ID

        Args:
            transaction_id: MonCash transaction ID

        Returns:
            Transaction details including status and amount
        """
        token = await self._get_access_token()

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }

        url = f"{self.transaction_url}?transactionId={transaction_id}"

        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers)
            response.raise_for_status()
            return response.json()

    async def transfer_to_vendor(
        self,
        amount: float,
        receiver_number: str,
        description: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Transfer money to service provider's MonCash account

        Args:
            amount: Transfer amount in HTG
            receiver_number: Vendor's MonCash phone number
            description: Transfer description

        Returns:
            Transfer confirmation details
        """
        token = await self._get_access_token()

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }

        payload = {
            "amount": amount,
            "receiver": receiver_number,
            "desc": description or "Booking payout",
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.transfer_url,
                headers=headers,
                json=payload,
            )
            response.raise_for_status()
            return response.json()

    async def verify_payment(self, transaction_id: str) -> bool:
        """
        Verify if a payment was successful

        Args:
            transaction_id: MonCash transaction ID

        Returns:
            True if payment successful, False otherwise
        """
        try:
            details = await self.get_transaction_details(transaction_id)
            # MonCash payment status: 200 = successful
            return details.get("status") == 200
        except Exception:
            return False


# Singleton instance
moncash_client = MonCashClient()
