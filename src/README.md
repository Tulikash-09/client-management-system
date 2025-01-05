# Meeting Scheduler Application

This project is a web-based application that allows users to manage and view meeting schedules. The application features a dynamic table for meeting details, filtering functionality by meeting topic, and a detailed view for selected meetings. It is built using Angular, Bootstrap for styling, and a backend service for data fetching.

---

## Features

1. **Meeting Table**: 
   - Displays a list of meetings with key details such as ID, Topic, and a button to view details.
   - Interactive rows with hover effects for enhanced user experience.

2. **Filter Meetings**:
   - Users can filter meetings dynamically by typing a topic in the search input.
   - Automatically focuses on the first matching result.

3. **Loading Spinner**:
   - Displays a loading indicator while meeting data is being fetched from the backend.

4. **Meeting Details Component**:
   - Provides an in-depth view of the selected meeting.
   - Can be dismissed using a close button.

5. **Error Handling**:
   - Handles scenarios where no meetings are available or an error occurs during data fetching.

---

## Technologies Used

- **Frontend**:
  - Angular (TypeScript)
  - Bootstrap (CSS Framework)
- **Backend**:
  - REST API endpoint (placeholder URL: `http://localhost:5500/view/{clientId}`)
- **State Management**:
  - Component-based data sharing using `@Input` and `@Output`.

---

## Project Structure

```plaintext
src/
├── app/
│   ├── view/
│   │   ├── view.component.ts        # Logic for the view component
│   │   ├── view.component.html      # Template for the view component
│   │   ├── view.component.css       # Styling for the view component
│   ├── meeting-details/
│   │   ├── meeting-details.component.ts  # Logic for meeting details
│   │   ├── meeting-details.component.html # Template for meeting details
│   │   ├── meeting-details.component.css # Styling for meeting details
├── assets/
├── environments/
```

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repository/meeting-scheduler.git
   cd meeting-scheduler
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   ng serve
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:4200`.

---

## Usage Instructions

1. Launch the application in a web browser.
2. Wait for the meetings to load (a loading spinner will be displayed).
3. Filter meetings by typing a topic in the search bar.
4. Click the "Details" button or a row to view additional details of a meeting.
5. If no meetings are available, a "No meetings scheduled yet" message will be shown.

---

## Development Notes

- The `@ViewChild` and `@ViewChildren` decorators are used to:
  - Focus the filter input field after the view is initialized.
  - Apply hover effects dynamically on meeting rows.
- The `ngOnInit` lifecycle hook initializes data fetching.
- The `ngAfterViewInit` lifecycle hook is used to manipulate DOM elements directly.

---

## Future Enhancements

- Add pagination for the meeting table.
- Integrate user authentication for enhanced security.
- Implement functionality for creating, updating, and deleting meetings.
- Add unit tests for components and services.

---

## Contact

For questions or suggestions, feel free to reach out at [your-email@example.com].
