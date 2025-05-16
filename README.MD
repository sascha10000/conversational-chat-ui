# S10k Conversational Agent

A versatile web component built with Lit that creates an elegant chat interface. While offering standard features like user/agent messaging, typing indicators, and theming options, its standout capability is the ability to dynamically render different input types through agent messages.

![S10k Conversational Agent Demo](./chat-input-examples.png)

Currently, the component supports Dropdown, Radio, and Text input types. For instructions on implementing additional input types, please refer to the detailed guide in the [CONTRIBUTING.MD](./CONTRIBUTING.md) file.

## Table of Contents
- [Using the showcase](#using-the-showcase)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
  - [Using npm](#using-npm-recommended-for-bundlers-like-vite-webpack-etc)
  - [Using CDN](#using-cdn-for-simple-http-servers)
  - [Using local files](#using-local-files-for-simple-http-servers)
- [Features](#features)
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Customization](#customization)
  - [CSS Custom Properties](#css-custom-properties)
  - [Example with Custom Theme](#example-with-custom-theme)
- [Simple Example](#simple-example)
- [Complete Example](#complete-example)
- [Browser Support](#browser-support)
- [License](#license)

## Using the showcase
To quickly try out the showcase without installing the package:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/s10k-conversational-agent.git
   cd s10k-conversational-agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser to see the demo.

## Installation

```bash
npm install s10k-conversational-agent
```

## Basic Usage

### Using npm (recommended for bundlers like Vite, Webpack, etc.)
```html
<script type="module">
  import 's10k-conversational-agent';
</script>

<s10k-conversational-agent></s10k-conversational-agent>
```

### Using CDN (for simple HTTP servers)
```html
<script type="module">
  import 'https://cdn.jsdelivr.net/npm/s10k-conversational-agent/dist/s10k-conversational-agent.js';
</script>

<s10k-conversational-agent></s10k-conversational-agent>
```

### Using local files (for simple HTTP servers)
```html
<script type="module">
  import './node_modules/s10k-conversational-agent/dist/s10k-conversational-agent.js';
</script>

<s10k-conversational-agent></s10k-conversational-agent>
```
You can also just download the js file and directly reference it.

## Features

- 💬 User and agent message support
- ⏱️ Timestamp display
- ⌨️ Typing indicator
- 🎨 Customizable theme
- 🔄 Auto-scrolling
- 📱 Responsive design
- 🎯 Name indicators
- 🔌 Event handling

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | String | 'Agent' | The name of the agent to display |
| `onMessage` | Function | - | Callback for all messages |
| `onUserMessage` | Function | - | Callback for user messages only |
| `onAgentMessage` | Function | - | Callback for agent messages only |

## Methods

### `sendMessage(text: string, sender: 'user' | 'agent' = 'agent')`

Send a message programmatically:

```javascript
const chat = document.querySelector('s10k-conversational-agent');
chat.sendMessage('Hello!', 'agent');
```

## Events

The component dispatches the following events:

- `message`: Fired for all messages
- `userMessage`: Fired for user messages only
- `agentMessage`: Fired for agent messages only

Example:
```javascript
const chat = document.querySelector('s10k-conversational-agent');

// Listen to all messages
chat.addEventListener('message', (e) => {
  console.log('Message:', e.detail);
});

// Listen to user messages only
chat.addEventListener('userMessage', (e) => {
  console.log('User message:', e.detail);
});

// Listen to agent messages only
chat.addEventListener('agentMessage', (e) => {
  console.log('Agent message:', e.detail);
});
```

## Customization

### CSS Custom Properties

You can customize the appearance using CSS custom properties:

```css
s10k-conversational-agent {
  /* Main colors */
  --s10k-chat-bg: #1a1a1a;
  --s10k-chat-text: #ffffff;
  --s10k-chat-border: #333333;
  
  /* Input colors */
  --s10k-chat-input-bg: #2d2d2d;
  --s10k-chat-input-text: #ffffff;
  
  /* Button colors */
  --s10k-chat-button-bg: #7c3aed;
  --s10k-chat-button-hover: #6d28d9;
  --s10k-chat-button-disabled: #404040;
  
  /* Message colors */
  --s10k-chat-message-user-bg: #7c3aed;
  --s10k-chat-message-user-text: #ffffff;
  --s10k-chat-message-agent-bg: #2d2d2d;
  --s10k-chat-message-agent-text: #ffffff;
  
  /* Typing indicator */
  --s10k-chat-typing-color: #888888;
}
```

### Example with Custom Theme

```html
<style>
  s10k-conversational-agent {
    --s10k-chat-bg: #2c3e50;
    --s10k-chat-button-bg: #e74c3c;
    --s10k-chat-message-user-bg: #3498db;
  }
</style>

<s10k-conversational-agent></s10k-conversational-agent>
```

## Simple Example

Here's a minimal example showing how to use the component with different input types:

```html
<script type="module">
  import 's10k-conversational-agent';
</script>

<s10k-conversational-agent id="chat"></s10k-conversational-agent>

<script>
  const chat = document.getElementById('chat');

  // Send a text message
  chat.sendMessage({
    sender: 'agent',
    content: {
      text: 'Hello! How can I help you today?'
    }
  });

  // Send a message with radio buttons
  chat.sendMessage({
    sender: 'agent',
    content: {
      text: 'Please select your preferred contact method:',
      inputConfig: {
        type: 'radio',
        options: [
          { label: 'Email', value: 'email' },
          { label: 'Phone', value: 'phone' },
          { label: 'SMS', value: 'sms' }
        ]
      }
    }
  });

  // Send a message with dropdown
  chat.sendMessage({
    sender: 'agent',
    content: {
      text: 'Select your timezone:',
      inputConfig: {
        type: 'dropdown',
        options: [
          { label: 'Eastern Time', value: 'ET' },
          { label: 'Central Time', value: 'CT' },
          { label: 'Pacific Time', value: 'PT' }
        ]
      }
    }
  });

  // Listen for messages
  chat.addEventListener('message', (e) => {
    console.log('Message received:', e.detail);
  });
</script>
```

## Complete Example

Here's a complete example using vanilla JavaScript that demonstrates all features:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Chat Example</title>
  <script type="module">
    // Choose one of these import methods:
    
    // 1. For bundlers (Vite, Webpack, etc.)
    // import 's10k-conversational-agent';
    
    // 2. For CDN
    import 'https://cdn.jsdelivr.net/npm/s10k-conversational-agent/dist/s10k-conversational-agent.js';
    
    // 3. For local files (adjust path as needed)
    // import './node_modules/s10k-conversational-agent/dist/s10k-conversational-agent.js';
  </script>
  <style>
    body {
      margin: 0;
      padding: 2rem;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #f5f5f5;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .container {
      width: 100%;
      max-width: 800px;
    }

    .controls {
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
    }

    .controls input {
      flex: 1;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .controls button {
      padding: 0.5rem 1rem;
      background-color: #7c3aed;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .controls button:hover {
      background-color: #6d28d9;
    }

    .log {
      margin-top: 1rem;
      padding: 1rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .log pre {
      margin: 0;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="container">
    <s10k-conversational-agent id="chat"></s10k-conversational-agent>
    
    <div class="controls">
      <input type="text" id="agent-input" placeholder="Type agent message...">
      <button onclick="sendAgentMessage()">Send as Agent</button>
    </div>

    <div class="log">
      <h3>Event Log</h3>
      <pre id="event-log"></pre>
    </div>
  </div>

  <script>
    // Get references to elements
    const chat = document.getElementById('chat');
    const agentInput = document.getElementById('agent-input');
    const eventLog = document.getElementById('event-log');
    let logCount = 0;

    // Format timestamp for log display
    function formatTimestamp(timestamp) {
      return new Date(timestamp).toLocaleTimeString();
    }

    // Log events to the event log
    function logEvent(event) {
      const message = event.detail;
      const logEntry = `[${formatTimestamp(message.timestamp)}] ${message.sender.toUpperCase()}: ${message.text}`;
      
      logCount++;
      eventLog.textContent = `${logEntry}\n${eventLog.textContent}`;
      
      // Keep only the last 10 messages in the log
      if (logCount > 10) {
        const lines = eventLog.textContent.split('\n');
        eventLog.textContent = lines.slice(0, 10).join('\n');
      }
    }

    // Send message as agent
    function sendAgentMessage() {
      const text = agentInput.value.trim();
      if (text) {
        chat.sendMessage(text, 'agent');
        agentInput.value = '';
      }
    }

    // Add event listeners
    chat.addEventListener('message', logEvent);
    chat.addEventListener('userMessage', (e) => console.log('User message:', e.detail));
    chat.addEventListener('agentMessage', (e) => console.log('Agent message:', e.detail));

    // Send initial greeting
    setTimeout(() => {
      chat.sendMessage('Hello! How can I help you today?', 'agent');
    }, 1000);
  </script>
</body>
</html>
```

This example demonstrates:
- Basic component setup
- Custom styling
- Event handling
- Programmatic message sending
- Event logging
- Initial greeting message

## Browser Support

The component works in all modern browsers that support Web Components and Shadow DOM.

## License

MIT
