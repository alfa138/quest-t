import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WorkersService {

    constructor(private http: HttpClient) {
    }

    getWorkers() {
        return this.http.get('https://interview-mock.herokuapp.com/api/workers/');
    }

    getWorkerFlights(workerId){
        return this.http.get('https://interview-mock.herokuapp.com/api/workers/' + workerId);
    }
}
