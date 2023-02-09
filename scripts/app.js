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

  $scope.handleUpload = function(fileType) {
    console.log($scope.invoiceData);
    console.log(fileType);
  }
});