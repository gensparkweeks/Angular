package persona.angularback.controller;
import persona.angularback.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import persona.angularback.service.PersonService;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("person")
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping
    public List<Person> findAll() {
        return personService.findAll();
    }

    @GetMapping("/{id}")
    public Person findById(@PathVariable int id){
        return personService.findById(id);
    }

    @PostMapping
    public Person create(@RequestBody Person person){
        return personService.save(person);
    }

    @PutMapping
    public Person update(@RequestBody Person person){
        return personService.save(person);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        personService.delete(id);
    }
}
