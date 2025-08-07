const projectStatus = {
  "PENDING": {
    description : "Pending Execution"
  },
  "SUCCESS": {
    description : "Executed Successfully"
  },
  "FAILURE": {
    description : "Execution Failed"
  }
};

class ProjectIdea {
  constructor(title, description){
      this.title = title;
      this.description = description;
      this.status = projectStatus.PENDING;
  }

  updateProjectStatus(newStatus){
      this.status = newStatus;
  }

}

class ProjectIdeaBoard{
  constructor(title){
      this.ideas = [];
      this.title = title;
  }

  pin(projectIdea){
      this.ideas.push(projectIdea);
  }

  unpin(projectIdea){
      this.ideas.pop(projectIdea);
  }

  count(){
    return this.ideas.length;
  }

  formatToString(){
    if(!this.count()){
      return 'Empty Board has 0 idea(s)\n';
    }

    let result = `${this.title} has ${this.count()} idea(s)\n`;
    this.ideas.forEach(({title, description, status}) => {
        result += `${title} (${status.description}) - ${description}\n`;  
    });

    return result;
  }
}


const proIdea =  new ProjectIdea("Smart Home System", "An integrated system to control lighting, temperature, and security devices remotely.");
const techProjects = new ProjectIdeaBoard("Tech Projects Board");

techProjects.pin(proIdea);
console.log(techProjects.formatToString());