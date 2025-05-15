import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type InteractiveOption = {
  id: string;
  label: string;
  value: string;
};

export type InteractiveMessageType = {
  type: 'radio' | 'dropdown' | 'checkbox';
  options: InteractiveOption[];
  message: string;
  id: string;
};

@customElement('s10k-interactive-message')
export class InteractiveMessage extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin: 0.5rem 0;
    }

    .message {
      margin-bottom: 0.5rem;
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .option {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .option:hover {
      background-color: var(--s10k-hover-bg, rgba(0, 0, 0, 0.05));
    }

    select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--s10k-border-color, #ddd);
      border-radius: 4px;
      background-color: var(--s10k-bg-color, white);
      color: var(--s10k-text-color, #333);
    }

    input[type="radio"],
    input[type="checkbox"] {
      margin: 0;
    }

    label {
      flex: 1;
      cursor: pointer;
    }
  `;

  @property({ type: Object })
  messageData!: InteractiveMessageType;

  @property({ type: String })
  theme: 'light' | 'dark' = 'light';

  private handleOptionSelect(value: string) {
    const event = new CustomEvent('option-selected', {
      detail: {
        messageId: this.messageData.id,
        value,
        timestamp: new Date().toISOString()
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  private renderRadioOptions() {
    return html`
      <div class="options">
        ${this.messageData.options.map(option => html`
          <div class="option" @click=${() => this.handleOptionSelect(option.value)}>
            <input type="radio" name="${this.messageData.id}" value="${option.value}">
            <label>${option.label}</label>
          </div>
        `)}
      </div>
    `;
  }

  private renderDropdownOptions() {
    return html`
      <select @change=${(e: Event) => this.handleOptionSelect((e.target as HTMLSelectElement).value)}>
        <option value="">Select an option...</option>
        ${this.messageData.options.map(option => html`
          <option value="${option.value}">${option.label}</option>
        `)}
      </select>
    `;
  }

  private renderCheckboxOptions() {
    return html`
      <div class="options">
        ${this.messageData.options.map(option => html`
          <div class="option" @click=${() => this.handleOptionSelect(option.value)}>
            <input type="checkbox" name="${this.messageData.id}" value="${option.value}">
            <label>${option.label}</label>
          </div>
        `)}
      </div>
    `;
  }

  render() {
    return html`
      <div class="message">${this.messageData.message}</div>
      ${this.messageData.type === 'radio' ? this.renderRadioOptions() :
        this.messageData.type === 'dropdown' ? this.renderDropdownOptions() :
        this.renderCheckboxOptions()}
    `;
  }
} 