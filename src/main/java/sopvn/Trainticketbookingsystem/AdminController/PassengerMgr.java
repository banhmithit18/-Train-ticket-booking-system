package sopvn.Trainticketbookingsystem.AdminController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import sopvn.Trainticketbookingsystem.model.passenger;
import sopvn.Trainticketbookingsystem.repository.passengerRepository;
import sopvn.Trainticketbookingsystem.ulti.Mappings;
import sopvn.Trainticketbookingsystem.ulti.ViewNames;

@Controller
public class PassengerMgr {
	@Autowired
	passengerRepository passengers;

	@RequestMapping(Mappings.ADMIN_PASSENGER_MANAGEMENT)
	public String Index(Model model) {
        List<passenger> passengerList = passengers.findAll();
        model.addAttribute("passengers",passengerList);
		return ViewNames.ADMIN_PASSENGER_MANAGEMENT;
	}

	// create with AJAX
	@RequestMapping(value = Mappings.ADMIN_PASSENGER_CREATE, method = RequestMethod.POST, consumes = {
			"application/json" })
	public @ResponseBody passenger CreatePassenger(@RequestBody passenger p) throws Exception {
		if (!CheckPassengerPhone(p)) {
			passengers.save(p);
			passenger passengerCreated = passengers.findByPhone(p.getPhone());
			return passengerCreated;
		} else {
			return null;
		}
	}

	// check if name already created
	public Boolean CheckPassengerPhone(passenger p) {
		if (passengers.findByPhone(p.getPhone()) != null) {
			return true;
		} else {
			return false;
		}
	}


	// edit
	@RequestMapping(value = Mappings.ADMIN_PASSENGER_EDIT, method = RequestMethod.POST, consumes = {"application/json" })
	public @ResponseBody passenger EditPassenger(@RequestBody passenger p) throws Exception {
		String phone = p.getPhone();
		String email = p.getEmail();
		String address = p.getAddress();
		String name = p.getName();
		passenger oldPssng = passengers.findByPhone(phone);
		oldPssng.setEmail(email);
		oldPssng.setAddress(address);
		oldPssng.setName(name);
		if(passengers.save(oldPssng) != null)
		{
			return oldPssng;
		}
		else
		{
			return null;
		}
		
	}

	// delete
	@RequestMapping(value = Mappings.ADMIN_PASSENGER_DELETE, method = RequestMethod.POST, consumes = {
			"application/json" })
	@ResponseBody
	public passenger DeletePassenger(@RequestBody String idInString) {
		int id = Integer.parseInt(idInString);
		passenger passengerDeleted = passengers.findById(id);
		try {

			passengers.deleteById(id);
		} catch (ExpressionException e) {
			return null;
		}
		return passengerDeleted;
	}
}
