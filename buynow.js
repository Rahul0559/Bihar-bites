function sendConfirmationEmail(customerEmail, orderDetails) {
  const message = `To: ${customerEmail}\r\n` +
                  `Subject: Order Confirmation - Bihar Bites\r\n\r\n` +
                  `Dear Customer,\r\n\r\n` +
                  `Thank you for your order!\r\n\r\n` +
                  `Order Details:\r\n` +
                  `Product: ${orderDetails.productName}\r\n` +
                  `Quantity: ${orderDetails.quantity}\r\n` +
                  `Total: ₹${orderDetails.totalPrice}\r\n\r\n` +
                  `Payment Method: ${orderDetails.paymentMethod}\r\n\r\n` +
                  `Shipping Address:\r\n` +
                  `${orderDetails.address}\r\n\r\n` +
                  `We will process your order shortly.\r\n\r\n` +
                  `Best regards,\r\n` +
                  `Bihar Bites`;

  const encodedMessage = btoa(unescape(encodeURIComponent(message)))
                          .replace(/\+/g, '-')
                          .replace(/\//g, '_')
                          .replace(/=+$/, '');

  const request = gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      'raw': encodedMessage
    }
  });

  request.execute();
}
