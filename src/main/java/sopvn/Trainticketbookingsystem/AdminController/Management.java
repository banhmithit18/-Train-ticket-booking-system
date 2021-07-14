package sopvn.Trainticketbookingsystem.AdminController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import sopvn.Trainticketbookingsystem.model.*;
import sopvn.Trainticketbookingsystem.repository.*;
import sopvn.Trainticketbookingsystem.ulti.Mappings;
import sopvn.Trainticketbookingsystem.ulti.ViewNames;

@Controller
public class Management {
	@Autowired trainRepository trains;
	@Autowired stationRepository stations;
	@Autowired seattypeRepository seattypes;
	@Autowired routineRepository routines;
	@Autowired scheduleRepository schedules;
	@Autowired carriageRepository carriages;
	@Autowired seatRepository seats;
	@RequestMapping(Mappings.ADMIN_MANAGEMENT)
	public String Index(Model model) {
		
		
        //show station,train with active true;
		List<station> routineStationList = stations.findByActiveTrue();
		List<train> routineTrainList = trains.findByActiveTrue();
		model.addAttribute("routineStations",routineStationList);
		model.addAttribute("routineTrains",routineTrainList);
		//show routine
		List<routine> routineList = routines.findAll();
		model.addAttribute("routines",routineList);
		//show routine with status true
		List<routine> scheduleRoutineList = routines.findByActiveTrue();
		model.addAttribute("scheduleRoutines",scheduleRoutineList);
		//show schedule list
		List<schedule> scheduleList = schedules.findAll();
		model.addAttribute("schedules",scheduleList);

	

		return ViewNames.ADMIN_MANAGEMENT;
	}
}
