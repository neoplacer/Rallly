angular.module("rallly",["ui.router","ngResource","ngFx"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,n){n.html5Mode(!0),t.otherwise("/notfound"),e.state("index",{url:"/",templateUrl:"templates/newevent.html",controller:"NewEventCtrl"}).state("about",{url:"/about",templateUrl:"templates/about.html"}).state("notfound",{url:"/notfound",templateUrl:"templates/notfound.html"}).state("editevent",{url:"/:id/edit",templateUrl:"templates/editevent.html",controller:"EditEventCtrl"}).state("event",{url:"/:id",templateUrl:"templates/event.html",controller:"EventCtrl"})}]).factory("Event",["$resource",function(e){return e("/api/event/:id",{id:"@_id"},{update:{method:"PUT"}})}]).factory("Participant",["$resource",function(e){return e("/api/event/:id/participant/:pid",{id:"@_id",pid:"@pid"},{update:{method:"PUT"}})}]),angular.module("rallly").controller("EditEventCtrl",["$scope","$http","$state","$timeout","Event",function(e,t,n,i,a){var r=n.params.id;e.event=a.get({id:r},function(t){for(var n=[],i=0;i<t.dates.length;i++)n.push(new Date(t.dates[i]));$("[data-datepicker]").datepicker("setDates",n),e.master=angular.copy(e.event)},function(){n.go("notfound")}),e.didChange=function(){return JSON.stringify(e.master)!=JSON.stringify(e.event)},e.didChangeDates=function(){return JSON.stringify(e.master.dates)!=JSON.stringify(e.event.dates)},e.submit=function(){e.didChange()&&(e.didChangeDates()?confirm("Changing the dates will reset all entries by the participants. Are you sure you want to proceed?")&&o():o())};var o=function(){e.event.participants=[],a.update({id:r},e.event,function(){i.cancel(e.didSave),e.master=angular.copy(e.event),e.didSave=i(function(){e.didSave=!1},2e3)})}}]),angular.module("rallly").controller("EventCtrl",["$scope","$http","$state","Event","Participant",function(e,t,n,i,a){$(".nav-link").removeClass("active");var r=n.params.id;e.event=i.get({id:r},function(){e.eventUrl=n.href("event",{id:e.event._id},{absolute:!0})},function(){n.go("notfound")}),e.delete=function(t){confirm("Are you sure you want to remove "+t.name+"?")&&a.remove({id:r,pid:t._id},function(t){e.event=t})},e.defaults=[],e.editEvent=function(){n.go("editevent",{id:e.event._id})},e.update=function(t){a.update({id:e.event._id,pid:t._id},t)},e.edit=function(t){e.defaults[e.event.participants.indexOf(t)]=angular.copy(t)},e.cancel=function(t){e.event.participants[t]=e.defaults[t]},e.save=function(t){var t=new a(t);t.$save({id:r},function(t){e.event=t,e.participant={}})}}]),angular.module("rallly").controller("NewEventCtrl",["$scope","$http","$state","Event",function(e,t,n){$(".nav-link[href='/']").addClass("active"),e.submit=function(){t.post("/api/event",e.event).success(function(t){e.event=t,e.eventUrl=n.href("event",{id:e.event._id},{absolute:!0})}).error(function(t){e.errors=t.errors})},e.clearDates=null}]).directive("datepicker",function(){return{restrict:"A",require:"ngModel",link:function(e,t,n,i){$(t).datepicker({multidate:!0,todayHighlight:!0,format:"dd/mm/yyyy"}).on("changeDate",function(e){var t=e.dates;t.sort(function(e,t){return e.getTime()>t.getTime()?!0:!1}),i.$setViewValue(t,e)}),e.clearDates=function(){$(t).datepicker("setDate",null)},e.unsetDate=function(n){$(t).datepicker("setDates",e.event.dates.filter(function(e){return e!=n}))}}}});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJjb250cm9sbGVycy9lZGl0ZXZlbnQuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2V2ZW50LmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9uZXdldmVudC5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQUEsT0FBQSxVQUFBLFlBQUEsYUFBQSxTQUNBLFFBQUEsaUJBQUEscUJBQUEsb0JBQUEsU0FBQSxFQUFBLEVBQUEsR0FDQSxFQUFBLFdBQUEsR0FDQSxFQUFBLFVBQUEsYUFDQSxFQUNBLE1BQUEsU0FDQSxJQUFBLElBQ0EsWUFBQSwwQkFDQSxXQUFBLGlCQUVBLE1BQUEsU0FDQSxJQUFBLFNBQ0EsWUFBQSx5QkFFQSxNQUFBLFlBQ0EsSUFBQSxZQUNBLFlBQUEsNEJBRUEsTUFBQSxhQUNBLElBQUEsWUFDQSxZQUFBLDJCQUNBLFdBQUEsa0JBRUEsTUFBQSxTQUNBLElBQUEsT0FDQSxZQUFBLHVCQUNBLFdBQUEsaUJBR0EsUUFBQSxTQUFBLFlBQUEsU0FBQSxHQUNBLE1BQUEsR0FBQSxrQkFBQSxHQUFBLFNBQ0EsUUFBQSxPQUFBLFlBR0EsUUFBQSxlQUFBLFlBQUEsU0FBQSxHQUNBLE1BQUEsR0FBQSxtQ0FBQSxHQUFBLE9BQUEsSUFBQSxTQUNBLFFBQUEsT0FBQSxZQ3BDQSxRQUFBLE9BQUEsVUFDQSxXQUFBLGlCQUFBLFNBQUEsUUFBQSxTQUFBLFdBQUEsUUFBQSxTQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsR0FDQSxHQUFBLEdBQUEsRUFBQSxPQUFBLEVBQ0EsR0FBQSxNQUFBLEVBQUEsS0FBQSxHQUFBLEdBQUEsU0FBQSxHQUVBLElBQUEsR0FEQSxNQUNBLEVBQUEsRUFBQSxFQUFBLEVBQUEsTUFBQSxPQUFBLElBQ0EsRUFBQSxLQUFBLEdBQUEsTUFBQSxFQUFBLE1BQUEsSUFFQSxHQUFBLHFCQUFBLFdBQUEsV0FBQSxHQUNBLEVBQUEsT0FBQSxRQUFBLEtBQUEsRUFBQSxRQUNBLFdBQ0EsRUFBQSxHQUFBLGNBRUEsRUFBQSxVQUFBLFdBQ0EsTUFBQSxNQUFBLFVBQUEsRUFBQSxTQUFBLEtBQUEsVUFBQSxFQUFBLFFBRUEsRUFBQSxlQUFBLFdBQ0EsTUFBQSxNQUFBLFVBQUEsRUFBQSxPQUFBLFFBQUEsS0FBQSxVQUFBLEVBQUEsTUFBQSxRQUVBLEVBQUEsT0FBQSxXQUNBLEVBQUEsY0FDQSxFQUFBLGlCQUNBLFFBQUEscUdBQ0EsSUFHQSxLQUlBLElBQUEsR0FBQSxXQUNBLEVBQUEsTUFBQSxnQkFDQSxFQUFBLFFBQ0EsR0FBQSxHQUNBLEVBQUEsTUFDQSxXQUNBLEVBQUEsT0FBQSxFQUFBLFNBQ0EsRUFBQSxPQUFBLFFBQUEsS0FBQSxFQUFBLE9BQ0EsRUFBQSxRQUFBLEVBQUEsV0FDQSxFQUFBLFNBQUEsR0FDQSxXQ3hDQSxRQUFBLE9BQUEsVUFDQSxXQUFBLGFBQUEsU0FBQSxRQUFBLFNBQUEsUUFBQSxjQUFBLFNBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxHQUNBLEVBQUEsYUFBQSxZQUFBLFNBQ0EsSUFBQSxHQUFBLEVBQUEsT0FBQSxFQUNBLEdBQUEsTUFBQSxFQUFBLEtBQUEsR0FBQSxHQUFBLFdBQ0EsRUFBQSxTQUFBLEVBQUEsS0FBQSxTQUNBLEdBQUEsRUFBQSxNQUFBLE1BRUEsVUFBQSxLQUVBLFdBQ0EsRUFBQSxHQUFBLGNBRUEsRUFBQSxPQUFBLFNBQUEsR0FDQSxRQUFBLG1DQUFBLEVBQUEsS0FBQSxNQUNBLEVBQUEsUUFBQSxHQUFBLEVBQUEsSUFBQSxFQUFBLEtBQUEsU0FBQSxHQUNBLEVBQUEsTUFBQSxLQUlBLEVBQUEsWUFFQSxFQUFBLFVBQUEsV0FDQSxFQUFBLEdBQUEsYUFBQSxHQUFBLEVBQUEsTUFBQSxPQUdBLEVBQUEsT0FBQSxTQUFBLEdBQ0EsRUFBQSxRQUNBLEdBQUEsRUFBQSxNQUFBLElBQ0EsSUFBQSxFQUFBLEtBQ0EsSUFFQSxFQUFBLEtBQUEsU0FBQSxHQUNBLEVBQUEsU0FBQSxFQUFBLE1BQUEsYUFBQSxRQUFBLElBQUEsUUFBQSxLQUFBLElBR0EsRUFBQSxPQUFBLFNBQUEsR0FDQSxFQUFBLE1BQUEsYUFBQSxHQUFBLEVBQUEsU0FBQSxJQUdBLEVBQUEsS0FBQSxTQUFBLEdBQ0EsR0FBQSxHQUFBLEdBQUEsR0FBQSxFQUNBLEdBQUEsT0FBQSxHQUFBLEdBQUEsU0FBQSxHQUNBLEVBQUEsTUFBQSxFQUNBLEVBQUEscUJDNUNBLFFBQUEsT0FBQSxVQUNBLFdBQUEsZ0JBQUEsU0FBQSxRQUFBLFNBQUEsUUFBQSxTQUFBLEVBQUEsRUFBQSxHQUNBLEVBQUEsdUJBQUEsU0FBQSxVQUVBLEVBQUEsT0FBQSxXQUNBLEVBQUEsS0FBQSxhQUFBLEVBQUEsT0FDQSxRQUFBLFNBQUEsR0FDQSxFQUFBLE1BQUEsRUFDQSxFQUFBLFNBQUEsRUFBQSxLQUFBLFNBQ0EsR0FBQSxFQUFBLE1BQUEsTUFFQSxVQUFBLE1BSUEsTUFBQSxTQUFBLEdBQ0EsRUFBQSxPQUFBLEVBQUEsVUFHQSxFQUFBLFdBQUEsUUFFQSxVQUFBLGFBQUEsV0FDQSxPQUNBLFNBQUEsSUFDQSxRQUFBLFVBQ0EsS0FBQSxTQUFBLEVBQUEsRUFBQSxFQUFBLEdBQ0EsRUFBQSxHQUFBLFlBQ0EsV0FBQSxFQUNBLGdCQUFBLEVBQ0EsT0FBQSxlQUVBLEdBQUEsYUFBQSxTQUFBLEdBQ0EsR0FBQSxHQUFBLEVBQUEsS0FDQSxHQUFBLEtBQUEsU0FBQSxFQUFBLEdBQ0EsTUFBQSxHQUFBLFVBQUEsRUFBQSxXQUFBLEdBQ0EsSUFFQSxFQUFBLGNBQUEsRUFBQSxLQUdBLEVBQUEsV0FBQSxXQUNBLEVBQUEsR0FBQSxXQUFBLFVBQUEsT0FFQSxFQUFBLFVBQUEsU0FBQSxHQUNBLEVBQUEsR0FBQSxXQUFBLFdBQUEsRUFBQSxNQUFBLE1BQUEsT0FBQSxTQUFBLEdBQ0EsTUFBQSxJQUFBIiwiZmlsZSI6InB1YmxpYy9idWlsZC9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgncmFsbGx5JywgWyd1aS5yb3V0ZXInLCduZ1Jlc291cmNlJywnbmdGeCddKVxuICAgIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpe1xuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSk7XG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvbm90Zm91bmRcIilcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdpbmRleCcse1xuICAgICAgICAgICAgdXJsIDogJy8nLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiAndGVtcGxhdGVzL25ld2V2ZW50Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlciA6ICdOZXdFdmVudEN0cmwnXG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnYWJvdXQnLCB7XG4gICAgICAgICAgICB1cmwgOiAnL2Fib3V0JyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogJ3RlbXBsYXRlcy9hYm91dC5odG1sJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ25vdGZvdW5kJywge1xuICAgICAgICAgICAgdXJsIDogJy9ub3Rmb3VuZCcsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybCA6ICd0ZW1wbGF0ZXMvbm90Zm91bmQuaHRtbCdcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdlZGl0ZXZlbnQnLCB7XG4gICAgICAgICAgICB1cmw6ICcvOmlkL2VkaXQnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiAndGVtcGxhdGVzL2VkaXRldmVudC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXIgOiAnRWRpdEV2ZW50Q3RybCdcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdldmVudCcse1xuICAgICAgICAgICAgdXJsIDogJy86aWQnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiAndGVtcGxhdGVzL2V2ZW50Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlciA6ICdFdmVudEN0cmwnXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICAuZmFjdG9yeSgnRXZlbnQnLCBmdW5jdGlvbigkcmVzb3VyY2Upe1xuICAgICAgICByZXR1cm4gJHJlc291cmNlKCcvYXBpL2V2ZW50LzppZCcsIHsgaWQgOiAnQF9pZCcgfSwge1xuICAgICAgICAgICAgJ3VwZGF0ZScgOiB7IG1ldGhvZCA6ICdQVVQnIH1cbiAgICAgICAgfSk7XG4gICAgfSlcbiAgICAuZmFjdG9yeSgnUGFydGljaXBhbnQnLCBmdW5jdGlvbigkcmVzb3VyY2Upe1xuICAgICAgICByZXR1cm4gJHJlc291cmNlKCcvYXBpL2V2ZW50LzppZC9wYXJ0aWNpcGFudC86cGlkJywgeyBpZDogJ0BfaWQnLCBwaWQgOiAnQHBpZCd9LCB7XG4gICAgICAgICAgICAndXBkYXRlJyA6IHsgbWV0aG9kIDogJ1BVVCcgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdyYWxsbHknKVxuLmNvbnRyb2xsZXIoJ0VkaXRFdmVudEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkc3RhdGUsICR0aW1lb3V0LCBFdmVudCl7XG4gICAgdmFyIGlkID0gJHN0YXRlLnBhcmFtcy5pZFxuICAgICRzY29wZS5ldmVudCA9IEV2ZW50LmdldCh7aWQ6aWR9LCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgdmFyIGRhdGVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5kYXRlcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBkYXRlcy5wdXNoKG5ldyBEYXRlKGRhdGEuZGF0ZXNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICAkKFwiW2RhdGEtZGF0ZXBpY2tlcl1cIikuZGF0ZXBpY2tlcignc2V0RGF0ZXMnLGRhdGVzKTtcbiAgICAgICAgJHNjb3BlLm1hc3RlciA9IGFuZ3VsYXIuY29weSgkc2NvcGUuZXZlbnQpO1xuICAgIH0sIGZ1bmN0aW9uKGUpe1xuICAgICAgICAkc3RhdGUuZ28oJ25vdGZvdW5kJyk7XG4gICAgfSk7XG4gICAgJHNjb3BlLmRpZENoYW5nZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSgkc2NvcGUubWFzdGVyKSAhPSBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZXZlbnQpO1xuICAgIH1cbiAgICAkc2NvcGUuZGlkQ2hhbmdlRGF0ZXMgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoJHNjb3BlLm1hc3Rlci5kYXRlcykgIT0gSlNPTi5zdHJpbmdpZnkoJHNjb3BlLmV2ZW50LmRhdGVzKTtcbiAgICB9XG4gICAgJHNjb3BlLnN1Ym1pdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmICgkc2NvcGUuZGlkQ2hhbmdlKCkpe1xuICAgICAgICAgICAgaWYgKCRzY29wZS5kaWRDaGFuZ2VEYXRlcygpICl7XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpcm0oXCJDaGFuZ2luZyB0aGUgZGF0ZXMgd2lsbCByZXNldCBhbGwgZW50cmllcyBieSB0aGUgcGFydGljaXBhbnRzLiBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcHJvY2VlZD9cIikpe1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbigpe1xuICAgICAgICAkc2NvcGUuZXZlbnQucGFydGljaXBhbnRzID0gW107XG4gICAgICAgIEV2ZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICBpZCA6IGlkXG4gICAgICAgIH0sICRzY29wZS5ldmVudCxcbiAgICAgICAgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICR0aW1lb3V0LmNhbmNlbCgkc2NvcGUuZGlkU2F2ZSk7XG4gICAgICAgICAgICAkc2NvcGUubWFzdGVyID0gYW5ndWxhci5jb3B5KCRzY29wZS5ldmVudCk7XG4gICAgICAgICAgICAkc2NvcGUuZGlkU2F2ZSA9ICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmRpZFNhdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdyYWxsbHknKVxuLmNvbnRyb2xsZXIoJ0V2ZW50Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRzdGF0ZSwgRXZlbnQsIFBhcnRpY2lwYW50KXtcbiAgICAkKFwiLm5hdi1saW5rXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB2YXIgaWQgPSAkc3RhdGUucGFyYW1zLmlkO1xuICAgICRzY29wZS5ldmVudCA9IEV2ZW50LmdldCh7aWQ6aWR9LCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgJHNjb3BlLmV2ZW50VXJsID0gJHN0YXRlLmhyZWYoJ2V2ZW50Jywge1xuICAgICAgICAgICAgaWQ6ICRzY29wZS5ldmVudC5faWRcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYWJzb2x1dGUgOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH0sIGZ1bmN0aW9uKGUpe1xuICAgICAgICAkc3RhdGUuZ28oJ25vdGZvdW5kJyk7XG4gICAgfSk7XG4gICAgJHNjb3BlLmRlbGV0ZSA9IGZ1bmN0aW9uKHBhcnRpY2lwYW50KXtcbiAgICAgICAgaWYgKGNvbmZpcm0oXCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gcmVtb3ZlIFwiK3BhcnRpY2lwYW50Lm5hbWUrXCI/XCIpKXtcbiAgICAgICAgICAgIFBhcnRpY2lwYW50LnJlbW92ZSh7IGlkIDogaWQgLCBwaWQgOiBwYXJ0aWNpcGFudC5faWQgfSwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgICAgICRzY29wZS5ldmVudCA9IGV2ZW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgJHNjb3BlLmRlZmF1bHRzID0gW107XG5cbiAgICAkc2NvcGUuZWRpdEV2ZW50ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgJHN0YXRlLmdvKCdlZGl0ZXZlbnQnLCB7IGlkIDogJHNjb3BlLmV2ZW50Ll9pZCB9KTtcbiAgICB9XG5cbiAgICAkc2NvcGUudXBkYXRlID0gZnVuY3Rpb24ocGFydGljaXBhbnQpe1xuICAgICAgICBQYXJ0aWNpcGFudC51cGRhdGUoe1xuICAgICAgICAgICAgaWQgOiAkc2NvcGUuZXZlbnQuX2lkLFxuICAgICAgICAgICAgcGlkIDogcGFydGljaXBhbnQuX2lkXG4gICAgICAgIH0sIHBhcnRpY2lwYW50KTtcbiAgICB9XG4gICAgJHNjb3BlLmVkaXQgPSBmdW5jdGlvbihwYXJ0aWNpcGFudCl7XG4gICAgICAgICRzY29wZS5kZWZhdWx0c1skc2NvcGUuZXZlbnQucGFydGljaXBhbnRzLmluZGV4T2YocGFydGljaXBhbnQpXSA9IGFuZ3VsYXIuY29weShwYXJ0aWNpcGFudCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgJHNjb3BlLmV2ZW50LnBhcnRpY2lwYW50c1tpbmRleF0gPSAkc2NvcGUuZGVmYXVsdHNbaW5kZXhdO1xuICAgIH1cblxuICAgICRzY29wZS5zYXZlID0gZnVuY3Rpb24ocGFydGljaXBhbnQpe1xuICAgICAgICB2YXIgcGFydGljaXBhbnQgPSBuZXcgUGFydGljaXBhbnQocGFydGljaXBhbnQpO1xuICAgICAgICBwYXJ0aWNpcGFudC4kc2F2ZSh7aWQ6aWR9LCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAkc2NvcGUuZXZlbnQgPSBldmVudDtcbiAgICAgICAgICAgICRzY29wZS5wYXJ0aWNpcGFudCA9IHt9O1xuICAgICAgICB9KTtcbiAgICB9XG59KTtcbiIsImFuZ3VsYXIubW9kdWxlKCdyYWxsbHknKVxuLmNvbnRyb2xsZXIoJ05ld0V2ZW50Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRzdGF0ZSwgRXZlbnQpe1xuICAgICQoXCIubmF2LWxpbmtbaHJlZj0nLyddXCIpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL2V2ZW50JywgJHNjb3BlLmV2ZW50KVxuICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihldmVudCwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpe1xuICAgICAgICAgICAgJHNjb3BlLmV2ZW50ID0gZXZlbnQ7XG4gICAgICAgICAgICAkc2NvcGUuZXZlbnRVcmwgPSAkc3RhdGUuaHJlZignZXZlbnQnLCB7XG4gICAgICAgICAgICAgICAgaWQ6ICRzY29wZS5ldmVudC5faWRcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBhYnNvbHV0ZSA6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gJHN0YXRlLmdvKCdldmVudCcse2lkIDogZGF0YS5ldmVudC5faWR9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmVycm9yKGZ1bmN0aW9uKGRhdGEsIHN0YXR1cywgaGVhZGVycywgY29uZmlnKXtcbiAgICAgICAgICAgICRzY29wZS5lcnJvcnMgPSBkYXRhLmVycm9ycztcbiAgICAgICAgfSlcbiAgICB9XG4gICAgJHNjb3BlLmNsZWFyRGF0ZXMgPSBudWxsXG59KVxuLmRpcmVjdGl2ZSgnZGF0ZXBpY2tlcicsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3QgOiAnQScsXG4gICAgICAgIHJlcXVpcmUgOiAnbmdNb2RlbCcsXG4gICAgICAgIGxpbmsgOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHJzLCBuZ01vZGVsKXtcbiAgICAgICAgICAgICQoZWwpLmRhdGVwaWNrZXIoe1xuICAgICAgICAgICAgICAgIG11bHRpZGF0ZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgdG9kYXlIaWdobGlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZm9ybWF0IDogJ2RkL21tL3l5eXknXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjaGFuZ2VEYXRlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGVzID0gZS5kYXRlcztcbiAgICAgICAgICAgICAgICBkYXRlcy5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgICAgICAgICAgICAgICBpZiAoYS5nZXRUaW1lKCkgPiBiLmdldFRpbWUoKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZ01vZGVsLiRzZXRWaWV3VmFsdWUoZGF0ZXMsIGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNjb3BlLmNsZWFyRGF0ZXMgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoZWwpLmRhdGVwaWNrZXIoJ3NldERhdGUnLCBudWxsKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjb3BlLnVuc2V0RGF0ZSA9IGZ1bmN0aW9uKGRhdGUpe1xuICAgICAgICAgICAgICAgICQoZWwpLmRhdGVwaWNrZXIoJ3NldERhdGVzJywgc2NvcGUuZXZlbnQuZGF0ZXMuZmlsdGVyKGZ1bmN0aW9uKGVsKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsICE9IGRhdGU7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9