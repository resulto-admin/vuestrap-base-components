// import dependencies
import {uniqueId} from '../../utils/helpers.js'
import template from './form-select.html'

// export component object
export default {
  template: template,
  replace: true,
  computed: {
    formGroupClass() {
      var formGroup = this.formGroupWrapper ? 'form-group' : ''
      return `${formGroup} ${this.inputState} ${this.extraGroupClass}`
    },
    formControlClass() {
      return `form-control ${this.inputSize} ${this.extraControlClass}`
    },
    formDivControlClass() {
      return this.extraDivControlClass
    },
    allOptions(){
      if (this.defaultOption.text && this.defaultOption.value) {
        return [this.defaultOption].concat(this.options)
      }
      return this.options
    },
  	inputState() {
      return !this.state || this.state === `default` ? `` : `has-${this.state}`
    },
    inputSize() {
      return !this.size || this.size === `default` ? `` : `form-control-${this.size}`
    },
  },
  props: {
    value: {
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showRequiredHint: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: [],
      required: true,
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
    formGroupWrapper: {
      type: Boolean,
      default: true
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
    defaultOption: {
      type: Object,
      default() {
        return {}
      }
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
  },
  methods: {
    onInput: function(event) {
      this.$emit('input', event.target.value)
    }
  }
}
