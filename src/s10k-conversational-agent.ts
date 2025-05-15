import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Define the message type
export type MessageSender = 'user' | 'agent';

export interface Message {
  text: string;
  sender: MessageSender;
  timestamp: number;
}

// Define the event type
export interface MessageEvent {
  text: string;
  sender: MessageSender;
  timestamp: number;
}

@customElement('s10k-conversational-agent')
export class S10kConversationalAgent extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      --chat-bg: var(--s10k-chat-bg, #1a1a1a);
      --chat-text: var(--s10k-chat-text, #ffffff);
      --chat-border: var(--s10k-chat-border, #333333);
      --chat-input-bg: var(--s10k-chat-input-bg, #2d2d2d);
      --chat-input-text: var(--s10k-chat-input-text, #ffffff);
      --chat-button-bg: var(--s10k-chat-button-bg, #7c3aed);
      --chat-button-hover: var(--s10k-chat-button-hover, #6d28d9);
      --chat-button-disabled: var(--s10k-chat-button-disabled, #404040);
      --chat-message-user-bg: var(--s10k-chat-message-user-bg, #7c3aed);
      --chat-message-user-text: var(--s10k-chat-message-user-text, #ffffff);
      --chat-message-agent-bg: var(--s10k-chat-message-agent-bg, #2d2d2d);
      --chat-message-agent-text: var(--s10k-chat-message-agent-text, #ffffff);
      --chat-typing-color: var(--s10k-chat-typing-color, #888888);
    }

    .chat-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 1rem;
      box-sizing: border-box;
      background-color: var(--chat-bg);
      color: var(--chat-text);
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .messages {
      height: 400px;
      overflow-y: auto;
      border: 1px solid var(--chat-border);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      background-color: var(--chat-bg);
    }

    .message-container {
      display: flex;
      align-items: flex-start;
      margin: 1rem 0;
      position: relative;
      height: fit-content;
    }

    .message-container.user {
      flex-direction: row-reverse;
    }

    .name-indicator {
      font-size: 0.75rem;
      opacity: 0.7;
      padding: 0.25rem 0.5rem;
      margin: 0 0.5rem;
      align-self: flex-start;
    }

    .message {
      max-width: 80%;
      border-radius: 12px;
      line-height: 1.4;
      position: relative;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-word;
      white-space: pre-wrap;
      height: fit-content;
    }

    .message-content {
      padding: 0.75rem 1rem;
      border-radius: 12px;
      position: relative;
      display: flex;
      flex-direction: column;
      height: fit-content;
    }

    .message-text {
      margin-bottom: 0.25rem;
    }

    .message .timestamp {
      font-size: 0.75rem;
      opacity: 0.7;
      text-align: right;
    }

    .message.user .message-content {
      background-color: var(--chat-message-user-bg);
      color: var(--chat-message-user-text);
      border-bottom-right-radius: 4px;
    }

    .message.agent .message-content {
      background-color: var(--chat-message-agent-bg);
      color: var(--chat-message-agent-text);
      border-bottom-left-radius: 4px;
    }

    .input-container {
      display: flex;
      gap: 0.5rem;
    }

    input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid var(--chat-border);
      border-radius: 8px;
      font-size: 1rem;
      background-color: var(--chat-input-bg);
      color: var(--chat-input-text);
      transition: border-color 0.2s ease;
    }

    input:focus {
      outline: none;
      border-color: var(--chat-button-bg);
    }

    input:disabled {
      background-color: var(--chat-button-disabled);
      cursor: not-allowed;
      opacity: 0.7;
    }

    button {
      padding: 0.75rem 1.5rem;
      background-color: var(--chat-button-bg);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    button:hover:not(:disabled) {
      background-color: var(--chat-button-hover);
    }

    button:disabled {
      background-color: var(--chat-button-disabled);
      cursor: not-allowed;
    }

    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--chat-typing-color);
      font-style: italic;
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
    }

    .typing-dots {
      display: flex;
      gap: 0.25rem;
    }

    .typing-dot {
      width: 4px;
      height: 4px;
      background-color: var(--chat-typing-color);
      border-radius: 50%;
      animation: typing 1s infinite;
    }

    .typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-4px);
      }
    }

    /* Scrollbar styling */
    .messages::-webkit-scrollbar {
      width: 8px;
    }

    .messages::-webkit-scrollbar-track {
      background: var(--chat-bg);
      border-radius: 4px;
    }

    .messages::-webkit-scrollbar-thumb {
      background: var(--chat-border);
      border-radius: 4px;
    }

    .messages::-webkit-scrollbar-thumb:hover {
      background: var(--chat-button-bg);
    }
  `;

  @property({ type: Array })
  messages: Message[] = [];

  @property({ type: String })
  inputValue: string = '';

  @property({ type: Function })
  onMessage: (message: MessageEvent) => void = (_) => {};

  @property({ type: Function })
  onUserMessage: (message: MessageEvent) => void = (_) => {};

  @property({ type: Function })
  onAgentMessage: (message: MessageEvent) => void = (_) => {};

  @property({ type: Boolean })
  private isLoading: boolean = false;

  @property({ type: String })
  name: string = 'Agent';

  private messagesContainer: HTMLElement | null = null;

  constructor() {
    super();
  }

  firstUpdated() {
    this.messagesContainer = this.shadowRoot?.querySelector('.messages') as HTMLElement;
    this.scrollToBottom();
  }

  private scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('messages') || changedProperties.has('isLoading')) {
      this.scrollToBottom();
    }
  }

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.inputValue = input.value;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  private handleMessage(message: Message) {
    // Call the general message callback if provided
    if (this.onMessage) {
      this.onMessage(message);
    }

    // Call the specific message callback if provided
    if (message.sender === 'user' && this.onUserMessage) {
      this.onUserMessage(message);
    } else if (message.sender === 'agent' && this.onAgentMessage) {
      this.onAgentMessage(message);
    }

    // Dispatch the general message event
    this.dispatchEvent(new CustomEvent('message', {
      detail: message,
      bubbles: true,
      composed: true
    }));

    // Dispatch the specific message event
    this.dispatchEvent(new CustomEvent(`${message.sender}Message`, {
      detail: message,
      bubbles: true,
      composed: true
    }));
  }

  private handleSubmit() {
    if (!this.inputValue.trim() || this.isLoading) return;

    const userMessage: Message = {
      text: this.inputValue,
      sender: 'user',
      timestamp: Date.now()
    };
    
    // Add user message
    this.messages = [...this.messages, userMessage];
    
    // Handle the message (both callback and event)
    this.handleMessage(userMessage);
    
    this.inputValue = '';
    this.isLoading = true;
  }

  /**
   * Public method to send a message from outside the component
   * @param text The message text to send
   * @param sender The sender of the message ('user' or 'agent')
   */
  public sendMessage(text: string, sender: MessageSender = 'agent') {
    const message: Message = {
      text,
      sender,
      timestamp: Date.now()
    };
    this.messages = [...this.messages, message];
    
    // Handle the message (both callback and event)
    this.handleMessage(message);
    
    // If this is an agent message, enable the input again
    if (sender === 'agent') {
      this.isLoading = false;
    }
  }

  private formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  render() {
    return html`
      <div class="chat-container">
        <div class="messages">
          ${this.messages.map(
            (message) => html`
              <div class="message-container ${message.sender}">
                ${message.sender === 'user' ? html`
                  <div class="message ${message.sender}">
                    <div class="message-content">
                      <div class="message-text">${message.text}</div>
                      <span class="timestamp">${this.formatTimestamp(message.timestamp)}</span>
                    </div>
                  </div>
                  <span class="name-indicator">You</span>
                ` : html`
                  <div class="message ${message.sender}">
                    <div class="message-content">
                      <div class="message-text">${message.text}</div>
                      <span class="timestamp">${this.formatTimestamp(message.timestamp)}</span>
                    </div>
                  </div>
                  <span class="name-indicator">${this.name}</span>
                `}
              </div>
            `
          )}
          ${this.isLoading ? html`
            <div class="typing-indicator">
              ${this.name} is typing
              <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
              </div>
            </div>
          ` : ''}
        </div>
        <div class="input-container">
          <input
            type="text"
            .value=${this.inputValue}
            @input=${this.handleInput}
            @keydown=${this.handleKeyDown}
            placeholder="Type your message..."
            ?disabled=${this.isLoading}
          />
          <button 
            @click=${this.handleSubmit}
            ?disabled=${this.isLoading}
          >
            Send
          </button>
        </div>
      </div>
    `;
  }
} 