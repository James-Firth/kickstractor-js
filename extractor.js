function jameskickstarter() {
  const getProjectDataAsCSV = () => {
    const project = window.current_project.data;

    const id = project.id;
    // Text
    const name = project.name;
    const description = project.blurb;

    // Backer count
    const backerCount = project.backers_count;
    const pledgedHomeAmount = project.pledged;

    // Money
    const goal = project.goal; // in Project Currencey
    const pledged = project.pledged; // in Project Currencey
    const percentageOfGoal = (pledged / goal) * 100.0;
    const usdPledged = project.usd_pledged;

    // Links
    const thumbnailLink = project.photo.thumb;
    const projectLink = `https://www.kickstarter.com/projects/${project.creator.slug}/${project.slug}`;
    // const projectLinkHtml = `<a href="${projectLink}">${name}</a>`;
    // console.log(projectLink, name, projectLinkHtml);

    const location = project.location.short_name;
    return {
      stringData :[
      id,
      name,
      projectLink,
      // projectLinkHtml,
      description,
      backerCount,
      goal,
      percentageOfGoal,
      location,
      thumbnailLink,
    ].join('\t'),
    data: {
      id,
      name,
      projectLink,
      // projectLinkHtml,
      description,
      backerCount,
      goal,
      percentageOfGoal,
      location,
      thumbnailLink,
    }};
  };

  const copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };
  const resetText = (x = '') => {
    $('#copybtn').text(`Copied!\n${x}`);
  };

  $('html').append(
    '<div id="copybtn" style="position: fixed;background-color: greenyellow;right: 50%;top: 50%;z-index: 100;padding: 0.3em;border-radius: 0.3em;cursor: pointer;box-shadow: 1px 3px 3px #39c60e;text-align: center; margin: auto; font-size: 20px;">Click to Copy Project Data to Clipboard</div>'
  );

  document.getElementById('copybtn').onclick = () => {
    const projectData = getProjectDataAsCSV();
    console.log(projectData.stringData);
    copyToClipboard(projectData.stringData);
    resetText(`Now paste into Google Doc`);
  };
}
