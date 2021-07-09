package sopvn.Trainticketbookingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sopvn.Trainticketbookingsystem.model.schedule;

public interface scheduleRepository extends JpaRepository<schedule, Integer> {
	schedule findById(int id);
	
}
