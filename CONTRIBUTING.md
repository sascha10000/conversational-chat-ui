# Contributing to s10k-conversational-agent

Thank you for your interest in contributing to the s10k-conversational-agent! This document provides guidelines and instructions for setting up the development environment and extending the component. If you make any changes, please fork the repository and submit a pull request so your feature can be reviewed and potentially included in the project.

## Development Setup

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

## Project Structure

```
s10k-conversational-agent/
├── src/
│   ├── s10k-conversational-agent.ts    # Main component
│   ├── s10k-chat-input.ts             # Input component
│   └── index.ts                       # Exports
├── dist/                              # Built files
├── index.html                         # Demo page
└── package.json
```

## Adding New Input Types

The component supports different types of inputs through the `s10k-chat-input` component. Here's how to add a new input type:

1. First, add your new input type to the `InputType` type in `s10k-chat-input.ts`:

```typescript
export type InputType = 'text' | 'radio' | 'dropdown' | 'your-new-type';
```

2. Add the necessary styles for your input type in the `static styles` of `s10k-chat-input.ts`:

```typescript
static styles = css`
  // ... existing styles ...

  .your-new-type {
    // Your custom styles
  }
`;
```

3. Add a new case in the `render` method of `s10k-chat-input.ts`:

```typescript
render() {
  switch (this.input.type) {
    // ... existing cases ...

    case 'your-new-type':
      return html`
        <div class="input-container">
          <!-- Your custom input HTML -->
        </div>
      `;

    default:
      return html`...`;
  }
}
```

4. Add any necessary handlers for your input type:

```typescript
private handleYourNewType(e: Event) {
  // Handle your input type's events
}
```

## Using Custom Input Types

To use your new input type, send a message with the appropriate configuration:

```javascript
const message = {
  text: "Your message text",
  inputConfig: {
    type: 'your-new-type',
    // Add any additional configuration needed for your input type
    customOption: 'value'
  }
};

// Send the message
agent.sendMessage(JSON.stringify(message), 'agent');
```

## Message Structure

The component uses a structured message format:

```typescript
interface Message {
  content: {
    type: 'text';
    text: string;
  };
  sender: 'user' | 'agent';
  timestamp: number;
}
```

When sending messages with input configuration, the `text` field should be a JSON string containing:

```typescript
{
  text: string;           // The message to display
  inputConfig?: {         // Optional input configuration
    type: InputType;      // The type of input to show
    options?: {           // Optional options for the input
      label: string;
      value: string;
    }[];
    placeholder?: string; // Optional placeholder text
  }
}
```

## Testing

1. Run the type checker:
```bash
npm run typecheck
```

2. Build the component:
```bash
npm run build
```

3. Test your changes in the demo page (`index.html`).

## Publishing Changes

1. Update the version in `package.json`
2. Build the component:
```bash
npm run build
```
3. Publish to npm:
```bash
npm publish
```

## Best Practices

1. Keep the component modular and maintainable
2. Add appropriate TypeScript types for new features
3. Follow the existing code style
4. Add comments for complex logic
5. Test your changes thoroughly
6. Update documentation when adding new features

## Need Help?

If you have any questions or need help, please:
1. Check the existing documentation
2. Look at the example implementations
3. Open an issue in the repository

Thank you for contributing! 