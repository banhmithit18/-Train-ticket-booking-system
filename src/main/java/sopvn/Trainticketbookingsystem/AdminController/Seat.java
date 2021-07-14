package sopvn.Trainticketbookingsystem.AdminController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import sopvn.Trainticketbookingsystem.model.carriage;
import sopvn.Trainticketbookingsystem.model.seat;
import sopvn.Trainticketbookingsystem.model.seatView;
import sopvn.Trainticketbookingsystem.model.seattype;
import sopvn.Trainticketbookingsystem.repository.carriageRepository;
import sopvn.Trainticketbookingsystem.repository.seatRepository;
import sopvn.Trainticketbookingsystem.repository.seattypeRepository;
import sopvn.Trainticketbookingsystem.ulti.Mappings;
import sopvn.Trainticketbookingsystem.ulti.ViewNames;

@Controller
public class Seat {
	@Autowired
	seatRepository seats;
	@Autowired
	seattypeRepository seattypes;
	@Autowired
	carriageRepository carriages;

	@RequestMapping(Mappings.ADMIN_SEAT_MANAGEMENT)
	public String Index(Model model) {
		// show seat type list
		List<seattype> seattypeList = seattypes.findAll();
		model.addAttribute("seattypes", seattypeList);
		// show seat list
		List<carriage> seatCarriage = carriages.findByActiveTrue();
		model.addAttribute("seatCarriages", seatCarriage);
		List<seattype> seatSeatType = seattypes.findByActiveTrue();
		model.addAttribute("seatSeatTypes", seatSeatType);
		List<seat> seatList = seats.findAll();
		model.addAttribute("seats", seatList);
		
		return ViewNames.ADMIN_SEAT_MANAGEMENT;
	}

	// enable with AJAX
	@RequestMapping(value = Mappings.ADMIN_SEAT_ENABLE, method = RequestMethod.POST, consumes = { "application/json" })
	@ResponseBody
	public seat EnableSeat(@RequestBody int id) {
		seat t = seats.findById(id);
		t.setActive(true);
		try {
			seats.save(t);
		} catch (Exception e) {
			return null;
		}
		return t;
	}

	// disable
	@RequestMapping(value = Mappings.ADMIN_SEAT_DISABLE, method = RequestMethod.POST, consumes = { "application/json" })
	@ResponseBody
	public seat DisableSeat(@RequestBody int id) {
		seat t = seats.findById(id);
		t.setActive(false);
		try {
			seats.save(t);
		} catch (Exception e) {
			return null;
		}

		return t;
	}

	// edit
	@RequestMapping(value = Mappings.ADMIN_SEAT_EDIT, method = RequestMethod.POST, consumes = { "application/json" })
	public @ResponseBody seatView EditSeat(@RequestBody seat p) throws Exception {
		float price = p.getPrice();
		int seattype = p.getSeattype();
		String name = p.getName();
		seat oldSeat = seats.findByName(name);
		oldSeat.setPrice(price);
		oldSeat.setSeattype(seattype);
		oldSeat.setSeat(seattypes.findById(seattype));

		if (seats.saveAndFlush(oldSeat) != null) {
			seatView viewReturn = new seatView();
			viewReturn.setId(oldSeat.getId());
			viewReturn.setPrice(String.valueOf(oldSeat.getPrice()));
			viewReturn.setSeattype(oldSeat.getSeat().getName());
			return viewReturn;
		} else {
			return null;
		}

	}

}
