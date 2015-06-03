function addXml(operation, itemDescriptor, id){
  if (operation === 'print-item'){
    $('[name=xmltext]').val($('[name=xmltext]').val() + '\n<print-item item-descriptor=\"' + itemDescriptor + '\" id=\"' + id + '\"/>' );
  }
}
