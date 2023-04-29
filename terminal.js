$(function () {

  $('.prompt').html('root@h_adji:~# ');

  var term = new Terminal('#input-line .cmdline', '#container output');
  term.init();

});

var util = util || {};
util.toArray = function (list) {
  return Array.prototype.slice.call(list || [], 0);
};
var Terminal = Terminal || function (cmdLineContainer, outputContainer) {
  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
  var birth_date = new Date("1999/08/06")
  var current_date = new Date()
  var age = Math.trunc((current_date - birth_date) / (3600 * 24 * 365 * 1000))
  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);

  var fs_ = null;
  var cwd_ = null;
  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function (e) {
    cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  //
  function inputTextClick_(e) {
    this.value = this.value;
  }

  //
  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value;
      }
    }
  }

  //
  function processNewCommand_(e) {

    if (e.keyCode == 9) { // tab
      e.preventDefault();
    } else if (e.keyCode == 13) { // enter
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }

      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id')
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);

      if (this.value && this.value.trim()) {
        var args = this.value.split(' ').filter(function (val, i) {
          return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1);
      }

      switch (cmd) {
        case 'clear':
          output_.innerHTML = '<h1>HADJI KHALIL</h1><h3>Software engineer who likes to automate stuff and to dribble around with data.<h3><p>Enter "help" for more information.</p><p> --</p>';
          this.value = '';
          return;
        case 'help':
          var result = "<h2>Look at you asking for help :D</h2><p><b>whoami</b>: Who am I ?<br><b>education</b>: display information about my education.<br><b>experience</b>: display information about my experiences.<br><b>projects</b>: display information about my projects.<br><b>interests</b>: my areas of intrests ?<br><b>contact</b>: wanna reach out ?<br><b>clear</b>: clear terminal<br><b>help</b>: display this menu.</p>";
          output(result);
          break;
        case 'education':
          var result = "<h3>Education</h3><p>[2019 : 2022] --> Bachelor of Engineering - BE, INPT - RABAT.<br>[2017 : 2019] --> Preparatory Classes, CPGE - SAFI.<br>[2015 : 2017] --> Baccalaureate - Mathematics Option-B, Champions School - SAFI.</p>";
          output(result);
          break;
        case 'experience':
          var result = "<h3>Experience</h3><p><b><span class='prof-experience'>Backend Engineer - Full time</span>&nbsp;&nbsp;&nbsp;Jul 2022 - Jan 2023 <br><br>HENCEFORTH Rabat - Morocco</b> <br>&nbsp;&nbsp;Built and designed APIs for a low-code platform, providing web data scraping services. <br>&nbsp;&nbsp;Design of a distributed scheduling system and task manager based that hanldes user defined job schedules on Celery-python. <br>&nbsp;&nbsp;Worked on patching automated browsers by spoofing some of the network and browser tracking fingerprints to avoid beign detected and to bypass blocking mechanisms. <br>&nbsp;&nbsp;<b>Tech Stack :</b> Python, FastApi, Celery, Asyncio, Threading, Playwright, Parsel, MongoDB, Beanie ODM, JSON Schema, Docker. <br><br><br> <b><span class='prof-experience'>Software Engineer - Internship</span> &nbsp;&nbsp;&nbsp;Mar 2022 - Jul 2022<br><br>HENCEFORTH Rabat - Morocco</b> <br>&nbsp;&nbsp;Development of a Social Media Community Management Tool. This is a productivity tool that allows maintenance and management of multiple social platforms from one source. <br>&nbsp;&nbsp;<b>Tech Stack :</b> Python, FastApi, APScheduler, Asyncio, Playwright, Postgresql, Tortoise ORM, JSON Schema, Docker, Appsmith. <br><br><br> <b><span class='prof-experience'>Data Engineer - Internship</span>&nbsp;&nbsp;&nbsp;Jul 2021 - Sep 2021<br><br>Leyton Casablanca - Morocco</b> <br>&nbsp;&nbsp;Worked on a corporate search engine (B2B) data collection pipeline. This search engine provides a search interface for companies based on multiple criteria and advanced filtering system. <br>&nbsp;&nbsp;<b>Tech Stack :</b> Python, Pyspark, Elasticsearch, NLTK, Selenium, request, Threading, Matomo. <br><br></p>";
          output(result);
          break;
        case 'projects':
          var result = "<h3>Projects </h3><p> <b><a href='https://github.com/H-ADJI/EasyData'>EasyData</a> :</b> Fully featured Backend for Low-code / configuration as code service for web data scraping <br> <b><a href='https://github.com/H-ADJI/jindex'>jindex</a> :</b> Unsatisfied with the Linkedin job search results, i built a bot to collect Linkedin job offers on a daily schedule, and implemented indexing, filtering and similarity computing against my resume using python. <br> <b><a href='https://github.com/H-ADJI/humanoid'>Humanoid</a> :</b> Making a bot look as human as possible by avoiding Fast keyboard typing, slowly scrolling to desired elements, No cursor jumps instead the cursor should follow a more natural path ( implemented with a Bézier curve interpolation to approximate human mouse movement curve) <br> <b> DofusBot :</b> Automated game heroes to gather ressources using lua scripts and snowbot SDK <br> <b><a href='https://github.com/H-ADJI/hackerRank-challenges'>HackerRank CLI</a> :</b> Built a CLI to log all my solved challenges from the HackerRank platform <br> <b> <a href='https://github.com/H-ADJI/easy-parsing'>Easy-parse</a> :</b> html parser implemented with decorator pattern and inspired from the Fastapi and flask library</p>";
          output(result);
          break;
        case 'interests':
          var result = "<h3>Interests</h3><p>Music, Health, Sports, Science.</p>";
          output(result);
          break;
        case 'contact':
          var result = "<h3>Contact</h3> \
          <h4>Email: khalil.o.3.lach@gmail.com<br><a style='text-decoration: none;'\
                  href='https://www.linkedin.com/in/khalil-hadji-7976a3198/' target='_blank'>LinkedIn</a><br><a style='text-decoration: none;'\
                  href='https://github.com/H-ADJI' target='_blank'>Github</a> <br><a style='text-decoration: none;'\
                  href='https://stackoverflow.com/users/18606630/h-adji' target='_blank'>Stackoverflow</a> <br><a style='text-decoration: none;'\
                  href='https://dev.to/hadji' target='_blank'>Blog</a> <br></h4>";
          output(result);
          break;
        case 'whoami':
          var result = "<h1>HADJI KHALIL</h1><p><h3>Software Engineer. Studied Data and software enginnering at <a style='text-decoration: none; color:rgb(40, 125, 252) ;' href='https://www.inpt.ac.ma/' target='_blank'>INPT</a>.<br>I did " + age + " trip around the sun <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-sun' viewBox='0 0 16 16'> <path d='M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z'/></svg>.<br>I enjoy passing on and sharing what i've learned, this really helps me solidify my knowledge.<br>I am extremely curious about everything that surrounds me.</h3></p>"
          output(result);
          break;
        default:
          if (cmd) {
            output(cmd + ': command not found');
          }
      };

      window.scrollTo(0, getDocHeight_());
      this.value = '';
    }
  }

  //
  function formatColumns_(entries) {
    var maxName = entries[0].name;
    util.toArray(entries).forEach(function (entry, i) {
      if (entry.name.length > maxName.length) {
        maxName = entry.name;
      }
    });

    var height = entries.length <= 3 ?
      'height: ' + (entries.length * 15) + 'px;' : '';

    var colWidth = maxName.length * 7;

    return ['<div class="ls-files" style="-webkit-column-width:',
      colWidth, 'px;', height, '">'];
  }

  //
  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '<p>' + html + '</p>');
  }

  function getDocHeight_() {
    var d = document;
    return Math.max(
      Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
      Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
      Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
  }

  //
  return {
    init: function () {
      output('<h1>HADJI KHALIL</h1><h3>Software engineer who likes to automate stuff and to dribble around with data.<h3><p>Enter "help" for more information.</p><p> --</p>');
    },
    output: output
  }
};
