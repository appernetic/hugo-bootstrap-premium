angular.module("myapp", ['angular-storage','ismobile','angularModalService'])
.service('toggleServices', function () {
  // this is to avoid the popover from showing again it's when already triggered.
  this.Data = {
    showSettings: true
  };
  this.getAll = function () {
    return this.Data;
  };
  this.setSettings = function (val) {
    this.Data.showSettings = val;
  };
})
.controller("MyController", function($scope, $timeout, toggleServices, store, isMobile, ModalService, $location) {
var modalSize = MODAL_SIZE;
var host = $location.host();
  if (isMobile.phone) {
    modalSize = "lg"; // large modal for phones!
  }

  var getCookie = store.get('cso');
  // Get initial value
  $scope.Data = toggleServices.getAll();
  // Open settings menu
  $scope.isOpen = function () {
    toggleServices.setSettings(false);
  };
  // Close settings menu
  $scope.isClosed = function () {
    toggleServices.setSettings(true);
  };
  var timeoutTrigger = SHOW_MODAL_TIMEOUT;
  var mouseLeave = MOUSE_LEAVE;
  var templateurl = "/popover.html";
  function isFromBiggerThanTo(dtmfrom, dtmto){
    return dtmfrom >=  dtmto;
  }

  var rightnow = new Date();

if(host == 'preview.appernetic.io'){
  templateurl = "/preview/popover.html";
};
  $scope.open = function(size) {
    // Just provide a template url, a controller and call 'showModal'.
    ModalService.showModal({
      templateUrl: templateurl,
      controller: "ModalInstanceCtrl",
      inputs: {
        modalSize: modalSize
      }
    }).then(function(modal) {
      modal.element.modal();

    });

  };

  if(getCookie){
    if (isFromBiggerThanTo(rightnow.getTime(), getCookie.date) && getCookie.subscribed == false){
      if(ENABLE_POPOVER){
        if ($scope.Data.showSettings){
          $timeout(function () {
            $scope.open(modalSize);
            $scope.isOpen();
          }, timeoutTrigger);
        };

        $scope.MouseLeave = function ($event) {
          $scope.isOpen();
          if (mouseLeave){
            if ($scope.Data.showSettings == true){
              $scope.open(modalSize);
            };
          };
        };
      };
    }
  } else {
    if(ENABLE_POPOVER){
      if ($scope.Data.showSettings){
        $timeout(function () {
          $scope.isOpen();
          $timeout(function () {
            $scope.open(modalSize);
          }, 1000);

        }, timeoutTrigger);
      };

      $scope.MouseLeave = function ($event) {
        $scope.isOpen();
        if (mouseLeave){
          if ($scope.Data.showSettings == true){
            $timeout(function () {
              $scope.open(modalSize);
            }, 1000);
          };
        };
      };
    };
  };

})
.controller('ModalInstanceCtrl', function ($scope, $http, $timeout, toggleServices, store, isMobile, $element, modalSize, close) {
  $scope.Data = toggleServices.getAll();
  $scope.expireCookie = EXPIRE_COOKIE;
  $scope.signupheader = SIGNUP_HEADER;
  $scope.signuptext = SIGNUP_TEXT;
  $scope.inputplaceholder = INPUT_PLACEHOLDER;
  $scope.submitbutton = SUBMIT_BUTTON;
  $scope.headerimage = HEADER_IMAGE;
  $scope.imgdescription = IMG_DESCRIPTION;
  $scope.result = "";
  $scope.isPhone = false;
  $scope.modalSize = modalSize;
  $scope.optin = OPTIN;

    if (isMobile.phone) {
      $scope.isPhone = true;
    }
  // Open settings menu
  $scope.isOpen = function () {
    toggleServices.setSettings(true);

  };
  // Close settings menu
  $scope.isClosed = function () {
    toggleServices.setSettings(false);

  };
  $scope.isOpen();
  $scope.myForm = {};
  $scope.myForm.Email = "";
  Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
  };
  var currentDate = new Date();
  // add days to current date
  currentDate.addDays($scope.expireCookie);
  var cookieObj = {};
  $scope.myForm.getFormFieldCssClass = function(ngModelController) {
    if(ngModelController.$pristine) return "";
    return ngModelController.$valid ? "fieldValid" : "fieldInvalid";
  }

  $scope.ok = function () {
    // post
    if($scope.formNg.$valid){
      var config = {
        method: 'POST',
        url: POST_URL,
        headers: {
          'Content-Type': undefined
        },
        data: {
          "email": $scope.myForm.Email,
          "optin": $scope.optin
        },
      };
      var responsePromise = $http(config);
      responsePromise.success(function(dataFromServer, status, headers, config) {
        $scope.SuccessMessage = SUCCESS_MESSAGE;
        $timeout(function () {
          $scope.SuccessMessage = "";
          $scope.isOpen = false;
        $scope.close();
        }, 2000);
      });
      responsePromise.error(function(data, status, headers, config) {
        alert("Submitting form failed!");
        $timeout(function () {
          $scope.ErrorMessage = ERROR_MESSAGE;
          $scope.isOpen = false;
        $scope.close();
        }, 3000);
      });
    }
    // end post
  };
  $scope.close = function() {
    $element.modal('hide');
    cookieObj = {
      date: currentDate.getTime(),
      subscribed: true
    };
    store.set('cso', cookieObj);
    close(null, 500);
  };
  $scope.cancel = function() {
    cookieObj = {
      date: currentDate.getTime(),
      subscribed: false
    };
    store.set('cso', cookieObj);
    $scope.isOpen = false;
    $element.modal('hide');
    close(null, 500);
  };
});
