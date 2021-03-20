import {Component, OnInit} from '@angular/core';
import {WorkersService} from './services/workers.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    workers;
    selectedWorker;
    selectedWorkerFlights;
    selectedFlight;
    intervalId;

    constructor(private workersService: WorkersService) {
    }

    ngOnInit() {
        this.getWorkers();
    }

    getWorkers() {
        this.workersService.getWorkers().subscribe(workers => {
            this.workers = workers;
        });
    }

    selectWorker(selectedWorker) {
        clearInterval(this.intervalId);
        this.selectedWorker = selectedWorker;
        this.selectedFlight = null;
        this.getFlightData(true);
    }

    getFlightData(refresh = false) {
        this.workersService.getWorkerFlights(this.selectedWorker.id).subscribe(flightData => {
            this.selectedWorkerFlights = flightData;

            if (!this.selectedFlight) {
                this.selectedFlight = flightData[0];
            }else {
                this.selectedFlight = this.selectedWorkerFlights.find(f => f.num === this.selectedFlight.num);
            }

            if (refresh) {
                this.refreshFlights();
            }
        });
    }

    refreshFlights() {
        this.intervalId = setInterval(() => {
            this.getFlightData();
        }, 1000 * 60);
    }

    selectAFlight(flight) {
        this.selectedFlight = flight;
    }

}
