angular.module("myapp", ['angular-storage','ismobile','angularModalService'])
.config(
  ['$httpProvider',
  function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])
  .service('toggleServices', function () {
    // this is to avoid the popover from showing again when it's already triggered.
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
    var cookieName = COOKIE_NAME;
    var absUrl = $location.absUrl();
    if (isMobile.phone) {
      modalSize = "lg"; // large modal for phones!
    }
    var getCookie = store.get(cookieName);

    function parseURL(url) {
      var parser = document.createElement('a'),
      searchObject = {},
      queries, split, i;
      // Let the browser do the work
      parser.href = url;
      // Convert query string to object
      queries = parser.search.replace(/^\?/, '').split('&');
      for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
      }
      return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
      };
    };
    var pathobj = parseURL(absUrl);
    var thepath = pathobj.pathname.split('/');
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
    var templateurl = "/modal/popover.html";
    function isFromBiggerThanTo(dtmfrom, dtmto){
      return dtmfrom >=  dtmto;
    };
    var rightnow = new Date();
    var isitpreview = thepath[1];
    if(isitpreview.indexOf('preview') > -1) {
      templateurl = '/' + thepath[1] + '/' + thepath[2] + '/modal/' + 'popover.html';
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
    var cookieName = COOKIE_NAME;

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
            Email: $scope.myForm.Email,
            Optin: $scope.optin
          },
        };
        var responsePromise = $http(config);
        responsePromise.success(function(data, status, headers, config) {
          $scope.SuccessMessage = SUCCESS_MESSAGE;
          $timeout(function () {
            $scope.SuccessMessage = "";
            $scope.isOpen = false;
            $scope.close();
          }, 2000);
        });
        responsePromise.error(function(data, status, headers, config) {

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
      store.set(cookieName, cookieObj);
      close(null, 500);
    };
    $scope.cancel = function() {
      cookieObj = {
        date: currentDate.getTime(),
        subscribed: false
      };
      store.set(cookieName, cookieObj);
      $scope.isOpen = false;
      $element.modal('hide');
      close(null, 500);
    };
  });
