// import dependencies
import {uniqueId} from '../../utils/helpers.js'
import template from './form-input.html'

// export component object
export default {
  template: template,
  replace: true,
  computed: {
    formGroupClass() {
      var formGroup = this.formGroupWrapper ? 'form-group' : '';
      return `${formGroup} ${this.inputState} ${this.extraGroupClass}`
    },
    formControlClass() {
      return `form-control ${this.stateIconType} ${this.inputSize} ${this.extraControlClass}`
    },
    formDivControlClass() {
      return this.extraDivControlClass
    },
    inputState() {
      return !this.state || this.state === `default` ? `` : `has-${this.state}`
    },
    stateIconType() {
      return !this.stateIcon || this.stateIcon === `default` ? `` : `form-control-${this.state}`
    },
    inputSize() {
      return !this.size || this.size === `default` ? `` : `form-control-${this.size}`
    },
    row() {
      return labelClass && inputClass
    }
  },
  props: {
    value: {
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    showRequiredHint: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text',
      required: true
    },
    formGroupWrapper: {
      type: Boolean,
      default: true
    },
    formLabelClass: {
      type: String,
      default: "control-label"
    },
    extraGroupClass: {
      type: String,
      default: "",
    },
    extraControlClass: {
      type: String,
      default: "",
    },
    extraDivControlClass: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: uniqueId
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    stateIcon: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    onInput: function(event) {
      this.$emit('input', event.target.value)
    }
  }
}
