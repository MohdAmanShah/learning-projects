const Projects = document.getElementById("projects");
fetchProject();
{
  /* <div class="project">
  <h3>Transparent Login Form</h3>
  <a href="./TransparentLoginForm/transparentloginform.html">open project</a>
</div>; */
}

async function fetchProject() {
  let ProjectJson = await fetch("/Scripts/projects.json");
  const text = await ProjectJson.text();
  ProjectJson = JSON.parse(text).Project;
  Array.from(ProjectJson).forEach((element) => {
    console.log(element.Href);
    const project = document.createElement("div");
    const projectName = document.createElement("h3");
    const projectLink = document.createElement("a");
    projectName.innerText = element.Name;
    projectLink.setAttribute("href", element.Href);
    projectLink.innerText = "Open Project";
    project.append(projectName, projectLink);
    project.classList.add("project");
    Projects.append(project); 
  });
}
