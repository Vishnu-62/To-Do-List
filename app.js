const twilio = require('twilio');
const accountSid = 'AC418b5b36ae3dac7a4014e463f52cb401';
const authToken = 'f25617b7276706bfa0efbf598d5e54c2';
const client = twilio(accountSid, authToken);

function addTask() {
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();
    const fromTime = document.getElementById('from-time').value;
    const toTime = document.getElementById('to-time').value;
  
    const sound="Powerful-Trap-.mp3";

    if (taskText !== '' && fromTime !== '' && toTime !== '') {
      const newTaskItem = document.createElement('li');
      newTaskItem.innerHTML = `
        <input type="checkbox" onclick="markCompleted(this)">
        <span>${taskText} - From ${fromTime} to ${toTime}</span>
      `;
  
      const taskList = document.getElementById('task-list');
      taskList.appendChild(newTaskItem);
  
      taskInput.value = '';
      document.getElementById('from-time').value = '';
      document.getElementById('to-time').value = '';
  
      // Schedule an alert when the task is due
      const currentTime = new Date().getTime();
      const dueTime = new Date(new Date().toDateString() + ' ' + toTime).getTime();
  
  
      if (dueTime > currentTime) {
        const timeDifference = dueTime - currentTime;
        setTimeout(() => {
            alert('Task "' + taskText + '" is due now!');
            const s=new Audio(sound);
            s.play(); 
            setTimeout(() =>{
                s.pause();
                s.currentTime=0;
            },10000)// Play the alarm sound
        }, timeDifference);
    }
  
      // Save the task to the database
      saveTaskToDatabase(taskText, fromTime, toTime);
    }
  }
  
  function saveTaskToDatabase(taskText, fromTime, toTime) {
    const data = {
      taskText: taskText,
      fromTime: fromTime,
      toTime: toTime
    };
  
    fetch('save_task.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
      console.log(result); // You can use this for debugging or display a message to the user
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  function markCompleted(checkbox) {
    const taskText = checkbox.nextElementSibling.textContent.split(' - From ')[0];
    checkbox.nextElementSibling.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
  
    // Update the task status in the database
    updateTaskStatusInDatabase(taskText, checkbox.checked ? 1 : 0);
  }
  
  function updateTaskStatusInDatabase(taskText, status) {
    const data = {
      taskText: taskText,
      status: status
    };
  
    fetch('update_status.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
      console.log(result); // You can use this for debugging or display a message to the user
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  function logout() {
    // Redirect to the new.html page
    window.location.href = 'index.html';
  }
  
 







  

  function sendSms(taskText) {
    const phoneNumber = '7907665638';
    const message = `Task "${taskText}" is due now!`;
  
    client.messages
      .create({
        body: message,
        from: '+17066003549',
        to: phoneNumber
      })
      .then(message => console.log('SMS sent:', message.sid))
      .catch(error => console.error('Error sending SMS:', error));
  }