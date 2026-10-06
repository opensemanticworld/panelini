import ontocombo from './ontocombo.vue';

export function register_ontocombo(JSONEditor, createApp) {
    JSONEditor.defaults.editors.ontocombo = class extends JSONEditor.defaults.editors.string {
        build() {
            // 1. Create a dummy hidden input to satisfy JSON-Editor's internal methods
            this.input = document.createElement('input');
            this.input.type = 'hidden';
            this.container.appendChild(this.input);

            // 2. Create the container for Vue
            this.vueContainer = document.createElement('div');
            this.container.appendChild(this.vueContainer);

            // 3. Mount Vue
            const ontologyData = this.schema.options?.ontology_data || [];

            this.vueApp = createApp(ontocombo, {
                options: ontologyData,
                modelValue: this.value,
                placeholder: this.schema.title || 'Select...',
                'onUpdate:modelValue': (newVal) => {
                    this.value = newVal;
                    this.input.value = newVal; // Keep dummy input in sync
                    this.onChange(true);
                }
            });

            this.vueInstance = this.vueApp.mount(this.vueContainer);
        }

        setValue(val) {
            this.value = val;
            if (this.input) this.input.value = val;
            if (this.vueInstance) {
                this.vueInstance.$props.modelValue = val;
            }
        }

        // Safely override enable/disable to prevent the crash
        enable() {
            if (!this.always_disabled) {
                this.disabled = false;
                if (this.input) this.input.disabled = false;
            }
        }

        disable(alwaysDisabled) {
            if (alwaysDisabled) this.always_disabled = true;
            this.disabled = true;
            if (this.input) this.input.disabled = true;
        }

        destroy() {
            if (this.vueApp) this.vueApp.unmount();
            if (this.vueContainer && this.vueContainer.parentNode) {
                this.vueContainer.parentNode.removeChild(this.vueContainer);
            }
            super.destroy();
        }
    };

    JSONEditor.defaults.resolvers.unshift((schema) => {
        if (schema.type === 'string' && schema.format === 'ontocombo') {
            return 'ontocombo';
        }
    });
}