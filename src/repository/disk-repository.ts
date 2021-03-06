import {Map} from 'immutable';
import { AbstractRepository } from './abstract-repository';
import { DiskDao } from '../dao/disk-dao';
import {Model} from '../model';
import {ModelEventName} from '../model-event-name';
import {DatastoreService} from '../service/datastore-service';
import {Disk} from '../model/Disk';

export class DiskRepository extends AbstractRepository<Disk> {
    private static instance: DiskRepository;
    private disks: Map<string, Map<string, any>>;
    private availableDisks: Map<string, Map<string, any>>;
    private bootDisks: Map<string, Map<string, any>>;
    private diskUsage: Map<string, Map<string, any>>;

    private constructor(private diskDao: DiskDao,
                        private datastoreService: DatastoreService) {
        super([
            Model.Disk,
            Model.DiskUsage
        ]);
    }

    public static getInstance() {
        if (!DiskRepository.instance) {
            DiskRepository.instance = new DiskRepository(
                new DiskDao(),
                DatastoreService.getInstance()
            );
        }
        return DiskRepository.instance;
    }

    public listDisks(): Promise<Array<Object>> {
        return this.disks ? Promise.resolve(this.disks.valueSeq().toJS()) : this.diskDao.list();
    }

    public clearReservedDisks() {
        this.datastoreService.save(Model.DiskUsage, 'reserved', {});
        this.datastoreService.save(Model.DiskUsage, 'freed', {});
    }

    public listAvailableDisks() {
        return this.availableDisks ? this.availableDisks.valueSeq().toJS() : [];
    }

    public listBootDisks() {
        return this.bootDisks ? this.bootDisks.valueSeq().toJS() : [];
    }

    public getDiskAllocation(disk: any) {
        let allocation;
        if (this.diskUsage.has('attached') && (this.diskUsage.get('attached').has(disk.path) || this.diskUsage.get('attached').has(disk.id))) {
            allocation = {
                name: this.diskUsage.get('attached').get(disk.path) || this.diskUsage.get('attached').get(disk.id),
                type: 'VOLUME'
            };
        } else if (this.diskUsage.has('detached') && (this.diskUsage.get('detached').has(disk.path) || this.diskUsage.get('detached').has(disk.id))) {
            allocation = {
                name: this.diskUsage.get('detached').get(disk.path) || this.diskUsage.get('detached').get(disk.id),
                type: 'EXPORTED_VOLUME'
            };
        } else if (this.diskUsage.has('boot') && (this.diskUsage.get('boot').has(disk.path) || this.diskUsage.get('boot').has(disk.id))) {
            allocation = {
                type: 'BOOT'
            };
        }
        return allocation;
    }

    public markDiskAsReserved(diskPath: any) {
        let diskUsage = this.datastoreService.getState().get(Model.DiskUsage) &&
                        this.datastoreService.getState().get(Model.DiskUsage).has('reserved') ?
                            this.datastoreService.getState().get(Model.DiskUsage).get('reserved').toJS() :
                            {};
        diskUsage[diskPath] = 'temp';
        this.datastoreService.save(Model.DiskUsage, 'reserved', diskUsage);
    }

    public markDiskAsNonReserved(diskPath: any) {
        let diskUsage = this.datastoreService.getState().get(Model.DiskUsage) &&
                        this.datastoreService.getState().get(Model.DiskUsage).has('reserved') ?
                            this.datastoreService.getState().get(Model.DiskUsage).get('reserved').toJS() :
                            {};
        delete diskUsage[diskPath];
        this.datastoreService.save(Model.DiskUsage, 'reserved', diskUsage);
    }

    public markDiskAsFreed(diskPath: any) {
        let diskUsage = this.datastoreService.getState().get(Model.DiskUsage) &&
                        this.datastoreService.getState().get(Model.DiskUsage).has('freed') ?
                            this.datastoreService.getState().get(Model.DiskUsage).get('freed').toJS() :
                            {};
        diskUsage[diskPath] = 'temp';
        this.datastoreService.save(Model.DiskUsage, 'freed', diskUsage);
    }

    public erase(disk: any) {
        return this.diskDao.erase(disk);
    }

    private getAvailableDisks(disks: Map<string, Map<string, any>>, diskUsage: Map<string, Map<string, string>>): Map<string, Map<string, any>> {
        return disks ?
            Map<string, Map<string, any>>(
                disks.filter((disk) =>  disk.get('online') && (
                                            (
                                                !this.isDiskUsed(disk, diskUsage.get('attached')) &&
                                                !this.isDiskUsed(disk, diskUsage.get('boot')) &&
                                                !this.isDiskUsed(disk, diskUsage.get('reserved'))
                                            ) || this.isDiskUsed(disk, diskUsage.get('freed'))
                                        )
                )
            ) :
            Map<string, Map<string, any>>();
    }

    private getBootDisks(disks: Map<string, Map<string, any>>, diskUsage: Map<string, Map<string, string>>): Map<string, Map<string, any>> {
        return disks ?
            Map<string, Map<string, any>>(
                disks.filter((disk) => this.isDiskUsed(disk, diskUsage.get('boot')))
            ) :
            Map<string, Map<string, any>>();
    }

    private isDiskUsed(disk: any, diskUsage: Map<string, string>) {
        return diskUsage && (diskUsage.has(disk.get('path')) || diskUsage.has(disk.get('id')));
    }

    protected handleStateChange(name: string, state: any) {
        switch (name) {
            case Model.Disk:
                this.disks = this.dispatchModelEvents(this.disks, ModelEventName.Disk, state);
                break;
            case Model.DiskUsage:
                this.availableDisks = this.getAvailableDisks(this.disks, state);
                this.bootDisks = this.getBootDisks(this.disks, state);
                this.diskUsage = state;
                this.eventDispatcherService.dispatch('AvailableDisksChanged', this.availableDisks);
                this.eventDispatcherService.dispatch('BootDisksChanged', this.bootDisks);
                break;
            default:
                break;
        }
    }

    protected handleEvent(name: string, data: any) {}
}

