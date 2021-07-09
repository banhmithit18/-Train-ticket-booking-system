package sopvn.Trainticketbookingsystem.AdminController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import sopvn.Trainticketbookingsystem.model.schedule;
import sopvn.Trainticketbookingsystem.model.scheduleView;
import sopvn.Trainticketbookingsystem.repository.routineRepository;
import sopvn.Trainticketbookingsystem.repository.scheduleRepository;

import sopvn.Trainticketbookingsystem.ulti.Mappings;

@Controller
public class Schedule {
	@Autowired routineRepository routines;
	@Autowired scheduleRepository schedules;

    ///create
	@RequestMapping(value = Mappings.ADMIN_SCHEDULE_CREATE, method = RequestMethod.POST, consumes = {"application/json" })
	@ResponseBody
	public scheduleView CreateRoutine(@RequestBody schedule s) throws Exception {
		///set constructor
	
		s.setRoutine(routines.findById(s.getRoutineId()));
		try {
			//save created schedule 
			schedule scheduleCreated = schedules.save(s);
			//create routine view
		    scheduleView scheduleReturn = new scheduleView();
		    scheduleReturn.setId(scheduleCreated.getId());
		    scheduleReturn.setRoutine(scheduleCreated.getRoutine().getName());
		    scheduleReturn.setDate(scheduleCreated.dateDisplay());
		    scheduleReturn.setPrice(String.valueOf(scheduleCreated.getPrice()));
		    scheduleReturn.setActive(scheduleCreated.getActive());
			//return
			return scheduleReturn;
		} catch (Exception e) {
			return null;
			
		}
				
	}

	// enable with AJAX
	@RequestMapping(value = Mappings.ADMIN_SCHEDULE_ENABLE, method = RequestMethod.POST, consumes = {"application/json"})
	@ResponseBody
	public schedule EnableSchedule(@RequestBody int id) {
		schedule r = schedules.findById(id);
		r.setActive(true);
		try {
			schedules.save(r);
		} catch (Exception e) {
			return null;
		}
		return r;
	}

	// disable
	@RequestMapping(value = Mappings.ADMIN_SCHEDULE_DISABLE, method = RequestMethod.POST, consumes = {"application/json"})
	@ResponseBody
	public schedule DisableRoutine(@RequestBody int id) {
		schedule r = schedules.findById(id);
		r.setActive(false);
		try {
			schedules.save(r);
		} catch (Exception e) {
			return null;
		}

		return r;
	}

	
}
