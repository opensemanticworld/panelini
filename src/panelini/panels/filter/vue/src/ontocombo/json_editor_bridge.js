import ontocombo from './ontocombo.vue';

export function register_ontocombo(JSONEditor, createApp) {
    JSONEditor.defaults.editors.ontocombo = class extends JSONEditor.defaults.editors.string {
        build() {
            super.build();
            if (this.input) {
                this.input.type = 'hidden';
                this.input.style.setProperty('display', 'none', 'important');
            }

            this.vueContainer = document.createElement('div');
            this.vueContainer.style.width = '100%';
            this.input.parentNode.insertBefore(this.vueContainer, this.input.nextSibling);

            const ontologyData = this.schema.options?.ontology_data || [];

            this.vueApp = createApp(ontocombo, {
                options: ontologyData,
                modelValue: this.value,
                placeholder: '',
                'onUpdate:modelValue': (newVal) => {
                    this.value = newVal;
                    if (this.input) this.input.value = newVal;
                    this.onChange(true);
                }
            });

            this.vueInstance = this.vueApp.mount(this.vueContainer);
        }

        setValue(val) {
            super.setValue(val);
            if (this.vueInstance && typeof this.vueInstance.updateFromExternal === 'function') {
                this.vueInstance.updateFromExternal(val);
            }
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