const app = angular.module("myapp", []);

app.controller("documentController", function($scope) {
  $scope.demoDate = new Date().toLocaleDateString();
  $scope.invoiceData = {}
  $scope.demo = JSON.stringify($scope.invoiceData);

  $scope.shortFundData = {
    paidTo: '',
    file: {}
  }

  $scope.othersData = {
    payeeAssociated: '',
    fileType: '',
    file: {}
  }

  $scope.uploadedDocInfo = {
    selectedType: '',
    payeeAssociated: ''
  }

  $scope.availableTypes = [
    'Invoice',
    'Short Fund Proof',
    'Other'
  ];

  $scope.payeeAssociated = [
    'MMP Capital Inc.',
    'Z Corporation',
    'ABC Vendor Ltd'
  ];

  $('#dropareaInvoice').on(
    'drop',
    function(e) {
      e.preventDefault();
      handleFileTransfer(e, 'invoiceFile');
  });

  $('#dropareaShortFund').on(
    'drop',
    function(e) {
      e.preventDefault();
      handleFileTransfer(e, 'shortFundFile');
  });

  $('#dropareaOther').on(
    'drop',
    function(e) {
      e.preventDefault();
      handleFileTransfer(e, 'othersFile');
  });

  function handleFileTransfer(event, elementIdName) {
    if (event.originalEvent.dataTransfer && event.originalEvent.dataTransfer.files.length) {
      const file = event.originalEvent.dataTransfer.files[0];
      const reader = new FileReader();

      if (file) {
        reader.addEventListener("load", ()=>{
          console.log(`File: ${file.name} read successfully!`);
          console.log(getFileContent(reader.result));
        });

        reader.addEventListener("error", ()=>{
          console.log(`Error occurred reading file: ${file.name}`);
        })
      }

      reader.readAsDataURL(file);
    }
  }

  // returns the blob data
  function getFileContent(fileData) {
    let fileContent = String(fileData);
    return fileContent.substring(fileContent.indexOf(',') + 1);
  }

  $scope.handleUpload = function(fileType) {
    console.log($scope.invoiceData);
    console.log(fileType);
  }
});
