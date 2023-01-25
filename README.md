# Scytale Pull Request Client

This is the Client side of the 'Scytale Pull Request Dashboard'!<br />
It holds the UI of the system<br />
Please make sure to have completed the ['Scyale-Server'](https://github.com/sufka861/scytale-server.git) README instructions before you start<br />
Using the UI you will be able to list all of the 'saved' pull-reuests, filter, sort, and create new pull requests

## Install & Run

1. Clone the project from [Git-Hub](https://github.com/sufka861/scytale-client.git)
2. cd into the project folder
    ```console
    <YourLocalFolder>:~$ cd scytale-client
    <YourLocalFolder>/scytale-client:~$
    ```
3. Use npm to install the dependencies specified in the package.json
    ```console
    npm install
    ```
4. To Start the app run:
    ```console
    npm start
    ```
    Notice: This is the staging environment and the server is configured to run on port 4000. So make sure the client app uses a different port.
5. Open your browser with the URL:
    ```console
    http://localhost:3000/
    ```

## How to use

_Pull request table:_<br />
&ensp; As you view the dashboard you are presented with the list of all pull-requests previously saved in the DB<br />
&ensp; The pull requests are paginated to show 10 pull requests per page<br />
&ensp; The pull requests are sorted by default from Old to New. You can scroll the pages to see them all.<br />
&ensp; If the content of a field is too long for the table, hover over it to see the full content displayed<br />
&ensp; The top of the table holds the name of each column<br />
&ensp; When hovering over each name - You will see options allowing to sorting the table by this column<br />
&ensp; You can also filter each row to show specific inputs, or hide the column<br />

_New Pull Request:_<br />
&ensp; By clicking NEW PULL REQUEST, a dialog opens up containing a form to fill out the pull request details.<br />
&ensp; You must fill all the required fields marked with \*<br />
&ensp; The description you enter may be longer than the row resulting with multiple rows added accordingly<br />
&ensp; Adding labels is done by typing your wanted label freely in the input, and pressing ENTER<br />
&ensp; Each label can be deleted before submission by clicking the X to the right of the label<br />
&ensp; If you exit the dialog before submitting, or do not enter all of the required fields, the form will not be sent<br />
&ensp; If you enter the form again, your inputs will be remembered<br />
&ensp; Only after the form is submitted successfully, the inputs will be refreshed<br />
&ensp; Upon successful submission, the table of pull requests will be updated immediately<br />

## Good to know

1. The date and time shown on each newly created pull request, is the local date and time of the clients browser<br />
   The date stored in the DB is GMT+00:00 regardless of the clients browser time zone
2. src/constants/index.tsx contains constant variables that are used across the system and can be changed when needed
3. The UI layout is based on 'Material UI'
4. Data fetching is optimized using 'react-query'
5. Data posting is optimized using 'react-hook-form'

## Enjoy

Feel free to play around and try for yourself

By: Suf Karmon
