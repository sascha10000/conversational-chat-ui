# S10k Conversational Agent

A modern, customizable chat interface web component built with Lit. This component provides a beautiful chat interface with support for user and agent messages, typing indicators, and custom styling.

## Installation

```bash
npm install s10k-conversational-agent
```

## Basic Usage

```html
<script type="module">
  import 's10k-conversational-agent';
</script>

<s10k-conversational-agent></s10k-conversational-agent>
```

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

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import 's10k-conversational-agent';
  </script>
  <style>
    s10k-conversational-agent {
      --s10k-chat-bg: #1a1a1a;
      --s10k-chat-button-bg: #7c3aed;
    }
  </style>
</head>
<body>
  <s10k-conversational-agent
    name="Assistant"
    @message=${(e) => console.log('Message:', e.detail)}
    @userMessage=${(e) => console.log('User message:', e.detail)}
    @agentMessage=${(e) => console.log('Agent message:', e.detail)}
  ></s10k-conversational-agent>

  <script>
    const chat = document.querySelector('s10k-conversational-agent');
    
    // Send a message programmatically
    chat.sendMessage('Hello! How can I help you?', 'agent');
  </script>
</body>
</html>
```

## Browser Support

The component works in all modern browsers that support Web Components and Shadow DOM.

## License

MIT
