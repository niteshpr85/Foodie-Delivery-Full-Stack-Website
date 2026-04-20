const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, 'data');
const ordersFile = path.join(dataDir, 'orders.json');
const messagesFile = path.join(dataDir, 'messages.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

async function ensureFile(filePath) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]', 'utf8');
  }
}

async function readData(filePath) {
  await ensureFile(filePath);
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content || '[]');
}

async function appendData(filePath, item) {
  const items = await readData(filePath);
  items.push(item);
  await fs.writeFile(filePath, JSON.stringify(items, null, 2), 'utf8');
  return item;
}

app.post('/api/orders', async (req, res) => {
  const { name, phone, address, payment, cart, total } = req.body;
  if (!name || !phone || !address || !payment || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ message: 'Please provide order details and at least one cart item.' });
  }

  const order = {
    id: Date.now(),
    name,
    phone,
    address,
    payment,
    cart,
    total,
    createdAt: new Date().toISOString(),
  };

  await fs.mkdir(dataDir, { recursive: true });
  await ensureFile(ordersFile);
  await appendData(ordersFile, order);

  res.json({ message: 'Order received successfully!' });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide name, email, and message.' });
  }

  const contactMessage = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  await fs.mkdir(dataDir, { recursive: true });
  await ensureFile(messagesFile);
  await appendData(messagesFile, contactMessage);

  res.json({ message: 'Message sent successfully!' });
});

app.get('/api/orders', async (req, res) => {
  const orders = await readData(ordersFile);
  res.json(orders);
});

app.get('/api/contact-messages', async (req, res) => {
  const messages = await readData(messagesFile);
  res.json(messages);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
