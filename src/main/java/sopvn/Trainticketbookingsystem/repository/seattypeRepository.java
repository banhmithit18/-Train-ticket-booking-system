package sopvn.Trainticketbookingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sopvn.Trainticketbookingsystem.model.seattype;

public interface seattypeRepository extends JpaRepository<seattype, Integer> {
	seattype findByName(String name);
	seattype findById(int id);
	List<seattype> findByActiveTrue();
	
}
