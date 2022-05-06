class TextArea {
  addTextArea() {
    this.textArea = document.createElement('textarea');
    this.textArea.setAttribute('id', 'text-area');
    this.textArea.setAttribute('onkeydown', 'if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+\'\\t\'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}');
    this.textArea.classList.add('text-area');
    return this.textArea;
  }
}

export default TextArea;
