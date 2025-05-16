import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface InputOption {
    label: string;
    value: string;
}

interface InputConfig {
    type: 'text' | 'radio' | 'dropdown' | 'checkbox';
    options?: InputOption[];
    placeholder?: string;
}

@customElement('s10k-chat-input')
export class S10kChatInput extends LitElement {
    @property({ type: Object })
    config?: InputConfig;

    @state()
    private selectedValue: string = '';

    @state()
    private selectedValues: string[] = [];

    private submitButton: HTMLButtonElement | null = null;

    static styles = css`
        :host {
            display: block;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 8px;
            margin-top: 1rem;
        }

        .input-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        input[type="text"] {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            font-size: 1rem;
        }

        .radio-group, .checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .radio-option, .checkbox-option {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            font-size: 1rem;
            background-color: white;
        }

        button {
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
            align-self: flex-end;
        }

        button:disabled {
            background-color: #6c757d;
            cursor: not-allowed;
        }

        button:hover:not(:disabled) {
            background-color: #0056b3;
        }
    `;

    render() {
        if (!this.config) return html``;

        switch (this.config.type) {
            case 'text':
                return this.renderTextInput();
            case 'radio':
                return this.renderRadioInput();
            case 'dropdown':
                return this.renderDropdownInput();
            case 'checkbox':
                return this.renderCheckboxInput();
            default:
                return html``;
        }
    }

    private renderTextInput() {
        return html`
            <div class="input-container">
                <input 
                    type="text" 
                    placeholder=${this.config?.placeholder || 'Type your message...'}
                    @input=${this.handleTextInput}
                >
                <button 
                    @click=${this.handleSubmit}
                    ?disabled=${!this.selectedValue}
                >
                    Submit
                </button>
            </div>
        `;
    }

    private renderRadioInput() {
        return html`
            <div class="input-container">
                <div class="radio-group">
                    ${this.config?.options?.map(option => html`
                        <label class="radio-option">
                            <input 
                                type="radio" 
                                name="radio-group" 
                                value=${option.value}
                                @change=${this.handleRadioChange}
                            >
                            ${option.label}
                        </label>
                    `)}
                </div>
                <button 
                    @click=${this.handleSubmit}
                    ?disabled=${!this.selectedValue}
                >
                    Submit
                </button>
            </div>
        `;
    }

    private renderDropdownInput() {
        return html`
            <div class="input-container">
                <select @change=${this.handleDropdownChange}>
                    <option value="" disabled selected>Select an option...</option>
                    ${this.config?.options?.map(option => html`
                        <option value=${option.value}>${option.label}</option>
                    `)}
                </select>
                <button 
                    @click=${this.handleSubmit}
                    ?disabled=${!this.selectedValue}
                >
                    Submit
                </button>
            </div>
        `;
    }

    private renderCheckboxInput() {
        return html`
            <div class="input-container">
                <div class="checkbox-group">
                    ${this.config?.options?.map(option => html`
                        <label class="checkbox-option">
                            <input 
                                type="checkbox" 
                                value=${option.value}
                                @change=${this.handleCheckboxChange}
                            >
                            ${option.label}
                        </label>
                    `)}
                </div>
                <button 
                    @click=${this.handleSubmit}
                    ?disabled=${this.selectedValues.length === 0}
                >
                    Submit
                </button>
            </div>
        `;
    }

    private handleTextInput(e: Event) {
        const input = e.target as HTMLInputElement;
        this.selectedValue = input.value.trim();
    }

    private handleRadioChange(e: Event) {
        const input = e.target as HTMLInputElement;
        this.selectedValue = input.value;
    }

    private handleDropdownChange(e: Event) {
        const select = e.target as HTMLSelectElement;
        this.selectedValue = select.value;
    }

    private handleCheckboxChange(e: Event) {
        const input = e.target as HTMLInputElement;
        if (input.checked) {
            this.selectedValues.push(input.value);
        } else {
            this.selectedValues = this.selectedValues.filter(v => v !== input.value);
        }
    }

    private handleSubmit() {
        const value = this.config?.type === 'checkbox' 
            ? this.selectedValues.join(', ')
            : this.selectedValue;

        this.dispatchEvent(new CustomEvent('submit', {
            detail: { value },
            bubbles: true,
            composed: true
        }));

        // Reset state
        this.selectedValue = '';
        this.selectedValues = [];
    }

    firstUpdated() {
        const button = this.shadowRoot?.querySelector('button');
        this.submitButton = button || null;
        
        // If there's only one option in dropdown, select it automatically
        if (this.config?.type === 'dropdown' && this.config.options?.length === 1) {
            const select = this.shadowRoot?.querySelector('select') as HTMLSelectElement;
            if (select) {
                select.value = this.config.options[0].value;
                this.selectedValue = this.config.options[0].value;
                if (this.submitButton) {
                    this.submitButton.disabled = false;
                }
            }
        }
    }
} 