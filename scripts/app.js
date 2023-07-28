const app = angular.module("myapp", []);

app.controller("documentController", function ($scope) {
  $scope.invoiceData = {
    payableTo: "",
    fileName: null,
    file: null,
  };

  $scope.shortFundData = {
    paidTo: "",
    fileName: null,
    file: null,
  };

  $scope.othersData = {
    payeeAssociated: "",
    fileBlob: null,
    fileName: null,
    otherFileType: null,
    file: null,
  };

  $scope.availableTypes = ["Invoice", "Short Fund Proof", "Other"];

  $scope.payeeAssociated = [
    "MMP Capital Inc.",
    "Z Corporation",
    "ABC Vendor Ltd",
  ];

  $("#dropareaInvoice").on("drop", function (e) {
    e.preventDefault();
    $scope.handleFileTransfer(e, "invoice");
  });

  $("#dropareaShortFund").on("drop", function (e) {
    e.preventDefault();
    $scope.handleFileTransfer(e, "Shortfund Proof");
  });

  $("#dropareaOther").on("drop", function (e) {
    e.preventDefault();
    $scope.handleFileTransfer(e, "others");
  });

  $("#uploadVendorInvoice").on("change", function (e) {
    e.preventDefault();
    handleInputFileUpload(e, "invoice");
  });

  function trimFileName(fileName) {
    let nameArray = fileName.split(".");
    let name = nameArray[0];
    let extension = nameArray[1];

    if (name.length > 70) {
      name = name.substring(0, 70);
    }

    return name + "." + extension;
  }

  function handleInputFileUpload(event, fileType) {
    const file = event.target.files[0];

    const fileSize = file.size / (1024 * 1024);
    if (fileSize > 5) {
      alert("File size can not be greater than 5MB");
      return;
    }

    let fileName = file.name;
    if (fileName.length > 80) {
      fileName = trimFileName(fileName);
    }

    if (fileType === "invoice") {
      $scope.invoiceData.fileName = fileName;
      $scope.invoiceData.file = file;
    } else if (fileType === "Shortfund Proof") {
      $scope.shortFundData.fileName = fileName;
      $scope.shortFundData.file = file;
    } else if (fileType === "others") {
      $scope.othersData.fileName = fileName;
      $scope.othersData.file = file;
    }

    $scope.$digest();
    console.log($scope.invoiceData);
  }

  $scope.handleFileTransfer = function (event, fileType) {
    if (
      event.originalEvent.dataTransfer &&
      event.originalEvent.dataTransfer.files.length
    ) {
      const file = event.originalEvent.dataTransfer.files[0];
      const reader = new FileReader();

      if (file) {
        reader.addEventListener("load", () => {
          if (fileType === "invoice") {
            $scope.invoiceData.fileName = file.name;
            $scope.invoiceData.file = file;
          } else if (fileType === "Shortfund Proof") {
            $scope.shortFundData.fileName = file.name;
            $scope.shortFundData.file = file;
          } else if (fileType === "others") {
            $scope.othersData.fileName = file.name;
            $scope.othersData.file = file;
          }

          $scope.$digest();
        });

        reader.addEventListener("error", () => {
          console.log(`Error occurred reading file: ${file.name}`);
        });
      }

      reader.readAsDataURL(file);
    }
  };

  // returns the blob data
  function getFileContent(fileData) {
    let fileContent = String(fileData);
    return fileContent.substring(fileContent.indexOf(",") + 1);
  }

  $scope.resetFileBlob = function (fileType) {
    if (fileType === "invoice") {
      $scope.invoiceData = {};
    } else if (fileType === "Shortfund Proof") {
      $scope.shortFundData = {};
    } else {
      $scope.othersData = {};
    }
  };

  function downloadFile(blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    // a.style.display = 'none';
    a.href = url;
    a.download = "demo file.txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  $scope.downloadFromAzure = function () {
    console.log("started download process");
    let endpoint =
      "https://fnstest.nmef.com/fasttfilestore/applicationsDownload?filename=ALL/test-app/0796d014-ecff-46c0-9318-ea742a16c891.txt";

    const req = fetch(endpoint, {
      method: "get",
      headers: {
        "Broker-Id": "ALL",
        "Ocp-Apim-Subscription-Key": "e137f7544dea40e1ad246e2ec9c6454d",
      },
    });

    req
      .then(
        function (res) {
          if (res.ok) {
            return res.blob();
          } else {
            console.warn(
              "Failed to download file from Azure File Store.\n Respose is " +
                res.status
            );
          }
        },
        function (error) {
          console.error(error);
        }
      )
      .then((blob) => {
        downloadFile(blob);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  $scope.uploadToAzure = function (
    appShortName,
    brokerShortName,
    fileToUpload
  ) {
    let fd = new FormData();
    fd.append("file", fileToUpload);

    const url =
      "https://fnstest.nmef.com/fasttfilestore/applications/" + appShortName;

    const req = fetch(url, {
      method: "post",
      body: fd,
      headers: {
        "Broker-Id": brokerShortName,
        "Ocp-Apim-Subscription-Key": "e137f7544dea40e1ad246e2ec9c6454d",
      },
    });

    req
      .then(
        function (res) {
          if (res.ok) {
            return res.text();
          } else {
            console.warn(
              "Failed to upload file on Azure File Store.\nResponse Status Code: " +
                res.status
            );
          }
        },
        function (error) {
          console.error(error);
        }
      )
      .then((azureFileUrl) => {
        console.log(azureFileUrl);
        // create a document in the system
      });
  };

  $scope.handleUpload = function (fileType) {
    let file = null;

    if (fileType === "invoice") {
      file = $scope.invoiceData.file;
    } else if (fileType === "Shortfund Proof") {
      file = $scope.shortFundData.file;
    } else {
      file = $scope.othersData.file;
    }

    console.log(file);
    return;

    console.log(file);
    $scope.uploadToAzure("A-100929", "BR-133525", file);
  };
});
