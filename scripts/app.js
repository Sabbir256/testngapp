const app = angular.module("myapp", []);

app.controller("documentController", function($scope) {
  // $scope.demoDate = new Date().toLocaleDateString();
  $scope.invoiceData = {
    payableTo: '',
    fileBlob: null,
    fileName: null
  }

  $scope.shortFundData = {
    paidTo: '',
    fileBlob: null,
    fileName: null
  }

  $scope.othersData = {
    payeeAssociated: '',
    fileBlob: null,
    fileName: null,
    otherFileType: null
  }

  // $scope.uploadedDocInfo = {
  //   selectedType: '',
  //   payeeAssociated: ''
  // }

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
      handleFileTransfer(e, 'invoice');
  });

  $('#dropareaShortFund').on(
    'drop',
    function(e) {
      e.preventDefault();
      handleFileTransfer(e, 'shortFund');
  });

  $('#dropareaOther').on(
    'drop',
    function(e) {
      e.preventDefault();
      handleFileTransfer(e, 'others');
  });

  function handleFileTransfer(event, fileType) {
    if (event.originalEvent.dataTransfer && event.originalEvent.dataTransfer.files.length) {
      const file = event.originalEvent.dataTransfer.files[0];
      const reader = new FileReader();

      if (file) {
        reader.addEventListener("load", ()=>{
          // console.log(`File: ${file.name} read successfully!`);
          if (fileType === 'invoice') {
            $scope.invoiceData.fileBlob = getFileContent(reader.result);
            $scope.invoiceData.fileName = file.name;
            console.log($scope.invoiceData);
          } else if (fileType === 'shortFund') {
            $scope.shortFundData.fileBlob = getFileContent(reader.result);
            $scope.shortFundData.fileName = file.name;
            console.log($scope.shortFundData);
          } else if (fileType === 'others') {
            $scope.othersData.fileBlob = getFileContent(reader.result);
            $scope.othersData.fileName = file.name;
            console.log($scope.othersData);
          }
          
          $scope.$digest();
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

  $scope.resetFileBlob = function(fileType) {
    if (fileType === 'invoice') {
      $scope.invoiceData = {};
    } else if (fileType === 'shortFund') {
      $scope.shortFundData = {};
    } else {
      $scope.othersData = {};
    }
  }

  $scope.handleUpload = function(fileType) {
    console.log($scope.invoiceData);
    console.log(fileType);
  }
});
