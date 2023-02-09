// myapp.directive('fileModel', ['$parse', function($parse){
//   return {
//     restrtict: 'A',
//     link: function(scope, element, attrs){
//       var model = $parse(attrs.fileModel);
//       var modelSetter = model.assign;

//       element.bind('change', function(){
//         console.log('wroking!')
//         scope.$apply(function(){
//           modelSetter(scope, element[0].files[0]);
//         })
//       })
//     }
//   }
// }])