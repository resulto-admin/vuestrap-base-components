// import dependencies
import {uniqueId} from '../../utils/helpers.js'
import template from './form-textarea.html'

// export component object
export default {
  template: template,
  replace: true,
  computed: {
    inputState() {
      return !this.state || this.state === `default` ? `` : `has-${this.state}`
    },
    formGroupClass() {
      var formGroup = this.formGroupWrapper ? 'form-group' : '';
      return `${formGroup} ${this.inputState} ${this.extraGroupClass}`
    },
    formDivControlClass() {
      return this.extraDivControlClass
    },
    formControlClass() {
      return `form-control ${this.stateIconType} ${this.inputSize} ${this.extraControlClass}`
    },
  },
  props: {
    value: {
      required: true
    },
    formGroupWrapper: {
      type: Boolean,
      default: true
    },
    showRequiredHint: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
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
    description: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 3
    }
  },
  methods: {
    onInput: function(event) {
      this.$emit('input', event.target.value)
    }
  }
}
