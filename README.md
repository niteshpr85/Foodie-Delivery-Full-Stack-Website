# Foodie Delivery Full-Stack Website

A responsive food delivery website with a Node.js/Express backend for handling orders and contact messages.

## Features

- **Responsive Design**: Optimized for desktop and mobile devices
- **Interactive Cart**: Add items to cart, view total, and proceed to checkout
- **Contact Form**: Submit messages that are saved on the backend
- **Order Management**: Place orders and store them in JSON files
- **Simple API**: RESTful endpoints for orders and messages

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Data Storage**: JSON files (orders.json, messages.json)
- **Dependencies**: CORS for cross-origin requests

## Installation

1. Clone or download the project to your local machine.
2. Navigate to the project directory.
3. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```
2. Open your browser and go to `http://localhost:3000`.
3. Browse the menu, add items to cart, and place orders.
4. Use the contact form to send messages.

## API Endpoints

- `GET /api/orders` - Retrieve all orders
- `POST /api/orders` - Submit a new order
- `GET /api/messages` - Retrieve all contact messages
- `POST /api/messages` - Submit a new contact message

## Project Structure

- `index.html` - Main HTML structure
- `style.css` - CSS styling
- `main.js` - Frontend JavaScript logic
- `server.js` - Express server and API routes
- `data/orders.json` - Stored orders
- `data/messages.json` - Stored contact messages
- `images/` - Image assets

## Contributing

Feel free to fork the repository and submit pull requests for improvements.

## License

This project is open-source and available under the [MIT License](LICENSE).
