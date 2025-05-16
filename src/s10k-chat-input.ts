import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type InputType = 'text' | 'radio' | 'dropdown';

export interface InputOption {
  label: string;
  value: string;
}

export interface ChatInput {
  type: InputType;
  placeholder?: string;
  options?: InputOption[];
  value?: string;
}

@customElement('s10k-chat-input')
export class S10kChatInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .input-container {
      display: flex;
      gap: 0.5rem;
      width: 100%;
    }

    input[type="text"] {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid var(--chat-border, #333333);
      border-radius: 8px;
      font-size: 1rem;
      background-color: var(--chat-input-bg, #2d2d2d);
      color: var(--chat-input-text, #ffffff);
      transition: border-color 0.2s ease;
    }

    input[type="text"]:focus {
      outline: none;
      border-color: var(--chat-button-bg, #7c3aed);
    }

    input[type="text"]:disabled {
      background-color: var(--chat-button-disabled, #404040);
      cursor: not-allowed;
      opacity: 0.7;
    }

    button {
      padding: 0.75rem 1.5rem;
      background-color: var(--chat-button-bg, #7c3aed);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      transition: background-color 0.2s ease;
      white-space: nowrap;
    }

    button:hover:not(:disabled) {
      background-color: var(--chat-button-hover, #6d28d9);
    }

    button:disabled {
      background-color: var(--chat-button-disabled, #404040);
      cursor: not-allowed;
    }

    .radio-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
      flex: 1;
      background-color: var(--chat-input-bg, #2d2d2d);
      border: 1px solid var(--chat-border, #333333);
      border-radius: 8px;
    }

    .radio-option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      color: var(--chat-input-text, #ffffff);
    }

    .radio-option:hover {
      background-color: var(--chat-button-hover, #6d28d9);
    }

    .radio-option input[type="radio"] {
      margin: 0;
      width: 1.2em;
      height: 1.2em;
      cursor: pointer;
    }

    select {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--chat-border, #333333);
      border-radius: 8px;
      font-size: 1rem;
      background-color: var(--chat-input-bg, #2d2d2d);
      color: var(--chat-input-text, #ffffff);
      cursor: pointer;
    }

    select:focus {
      outline: none;
      border-color: var(--chat-button-bg, #7c3aed);
    }

    select:disabled {
      background-color: var(--chat-button-disabled, #404040);
      cursor: not-allowed;
      opacity: 0.7;
    }
  `;

  @property({ type: Object })
  input: ChatInput = { type: 'text' };

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Function })
  onSubmit: (value: string) => void = () => {};

  private handleTextInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.input = { ...this.input, value: input.value };
  }

  private handleRadioChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.input = { ...this.input, value: input.value };
  }

  private handleSelectChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.input = { ...this.input, value: select.value };
  }

  private handleSubmit() {
    if (this.input.value) {
      this.onSubmit(this.input.value);
      this.input = { ...this.input, value: '' };
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  render() {
    switch (this.input.type) {
      case 'radio':
        return html`
          <div class="input-container">
            <div class="radio-group">
              ${this.input.options?.map(option => html`
                <label class="radio-option">
                  <input
                    type="radio"
                    name="radio-group"
                    value="${option.value}"
                    ?checked="${this.input.value === option.value}"
                    @change="${this.handleRadioChange}"
                    ?disabled="${this.disabled}"
                  />
                  ${option.label}
                </label>
              `)}
            </div>
            <button
              @click="${this.handleSubmit}"
              ?disabled="${!this.input.value || this.disabled}"
            >
              Send
            </button>
          </div>
        `;

      case 'dropdown':
        return html`
          <div class="input-container">
            <select
              @change="${this.handleSelectChange}"
              ?disabled="${this.disabled}"
            >
              <option value="" disabled selected>Select an option</option>
              ${this.input.options?.map(option => html`
                <option value="${option.value}">${option.label}</option>
              `)}
            </select>
            <button
              @click="${this.handleSubmit}"
              ?disabled="${!this.input.value || this.disabled}"
            >
              Send
            </button>
          </div>
        `;

      default:
        return html`
          <div class="input-container">
            <input
              type="text"
              .value="${this.input.value || ''}"
              @input="${this.handleTextInput}"
              @keydown="${this.handleKeyDown}"
              placeholder="${this.input.placeholder || 'Type your message...'}"
              ?disabled="${this.disabled}"
            />
            <button
              @click="${this.handleSubmit}"
              ?disabled="${!this.input.value || this.disabled}"
            >
              Send
            </button>
          </div>
        `;
    }
  }
} 