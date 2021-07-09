package sopvn.Trainticketbookingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sopvn.Trainticketbookingsystem.model.seat;

public interface seatRepository extends JpaRepository<seat, Integer> {
	seat findById(int id);
	seat findByName(String name);
}
