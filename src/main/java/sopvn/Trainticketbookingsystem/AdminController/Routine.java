package sopvn.Trainticketbookingsystem.AdminController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import sopvn.Trainticketbookingsystem.model.routine;
import sopvn.Trainticketbookingsystem.model.routineView;
import sopvn.Trainticketbookingsystem.model.train;
import sopvn.Trainticketbookingsystem.repository.routineRepository;
import sopvn.Trainticketbookingsystem.repository.stationRepository;
import sopvn.Trainticketbookingsystem.repository.trainRepository;
import sopvn.Trainticketbookingsystem.ulti.Mappings;

@Controller
public class Routine {
	
	@Autowired routineRepository routines;
	@Autowired trainRepository trains;
	@Autowired stationRepository stations;

	///check routine name
	public Boolean CheckRoutineName(routine r) {
		if (routines.findByName(r.getName()) != null) {
			return true;
		} else {
			return false;
		}
	}
	
    ///create
	@RequestMapping(value = Mappings.ADMIN_ROUTINE_CREATE, method = RequestMethod.POST, consumes = {"application/json" })
	@ResponseBody
	public routineView CreateRoutine(@RequestBody routine r) throws Exception {
		///set constructor
		if(!CheckRoutineName(r))
		{
		r.setStation_end(stations.findById(r.getStationEnd()));
		r.setStation_start(stations.findById(r.getStationStart()));
		r.setTrain(trains.findById(r.getTrainId()));
		try {
			//save created routine 
			routine routineCreated = routines.save(r);
			//create routine view
			routineView routineReturn = new routineView();
			routineReturn.setId(routineCreated.getId());
			routineReturn.setName(routineCreated.getName());
			routineReturn.setTrain(routineCreated.getTrain().getName());
			routineReturn.setStationStart(routineCreated.getStation_start().getName());
			routineReturn.setStationEnd(routineCreated.getStation_end().getName());
			routineReturn.setDepartureTime(routineCreated.departuretimeDisplay());
			routineReturn.setArrivalTime(routineCreated.arrivaltimeDisplay());
			routineReturn.setDistance(routineCreated.getDistance());
			routineReturn.setActive(routineCreated.getActive());
			//return
			return routineReturn;
		} catch (Exception e) {
			return null;
			
		}
		}
		else
		{
			return null;
		}
	}

	// enable with AJAX
	@RequestMapping(value = Mappings.ADMIN_ROUTINE_ENABLE, method = RequestMethod.POST, consumes = {"application/json"})
	@ResponseBody
	public routine EnableRoutine(@RequestBody int id) {
		routine r = routines.findById(id);
		r.setActive(true);
		try {
			routines.save(r);
		} catch (Exception e) {
			return null;
		}
		return r;
	}

	// disable
	@RequestMapping(value = Mappings.ADMIN_ROUTINE_DISABLE, method = RequestMethod.POST, consumes = {"application/json"})
	@ResponseBody
	public routine DisableRoutine(@RequestBody int id) {
		routine r = routines.findById(id);
		r.setActive(false);
		try {
			routines.save(r);
		} catch (Exception e) {
			return null;
		}

		return r;
	}

	// delete
	@RequestMapping(value = Mappings.ADMIN_ROUTINE_DELETE, method = RequestMethod.POST, consumes = {"application/json"})
	@ResponseBody
	public routine DeleteTrain(@RequestBody String idInString) {
		int id = Integer.parseInt(idInString);
		routine routineDeleted = routines.findById(id);
		try {
			
			routines.deleteById(id);
		} catch (ExpressionException e) {
			return null;
		}
		return routineDeleted;
	}

}
