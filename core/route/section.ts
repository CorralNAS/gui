import Promise = require("bluebird");
import {EventDispatcherService} from "../service/event-dispatcher-service";
import {ModelDescriptorService} from "../service/model-descriptor-service";

import sectionsDescriptors  = require("core/model/sections-descriptors.json");
import {AbstractRoute} from "./abstract-route";
import {Model} from "../model";

export class SectionRoute extends AbstractRoute {
    private static instance: SectionRoute;
    private sectionsServices: Map<string, any>;

    private constructor(private modelDescriptorService: ModelDescriptorService,
                        eventDispatcherService: EventDispatcherService) {
        super(eventDispatcherService);
        this.sectionsServices = new Map<string, any>();
    }

    public static getInstance() {
        if (!SectionRoute.instance) {
            SectionRoute.instance = new SectionRoute(
                ModelDescriptorService.getInstance(),
                EventDispatcherService.getInstance()
            );
        }
        return SectionRoute.instance;
    }

    public get(sectionId: string): Promise<Array<any>> {
        let self = this,
            objectType = Model.Section,
            sectionDescriptor = sectionsDescriptors[sectionId],
            servicePromise;
        if (this.sectionsServices.has(sectionDescriptor.id)) {
            servicePromise = Promise.resolve(this.sectionsServices.get(sectionDescriptor.id));
        } else {
            servicePromise = Promise.resolve().then(function() {
                return require.async(sectionDescriptor.service)
            }).then(function(module) {
                let exports = Object.keys(module);
                if (exports.length === 1) {
                    let clazz = module[exports[0]],
                        instance = clazz.instance || new clazz(),
                        instancePromise = instance.instanciationPromise;
                    self.sectionsServices.set(sectionDescriptor.id, instance);
                    return instancePromise;
                }
            }).then(function(service) {
                service.sectionGeneration = 'new';
                service.section.id = sectionDescriptor.id;
                service.section.settings.id = sectionDescriptor.id;
                service.section.label = sectionDescriptor.label;
                service.section.icon = sectionDescriptor.icon;
                return service;
            });
        }
        if (Promise.is(servicePromise)) {
            return servicePromise.then(function(service) {
                return [
                    service,
                    self.modelDescriptorService.getUiDescriptorForType(objectType)
                ];
            }).spread(function(service, uiDescriptor) {
                let stack = [
                    {
                        object: service.section,
                        service: service,
                        userInterfaceDescriptor: uiDescriptor,
                        columnIndex: 0,
                        objectType: objectType,
                        path: '/' + encodeURIComponent(sectionDescriptor.id)
                    }
                ];

                self.eventDispatcherService.dispatch('sectionChange', service);
                self.eventDispatcherService.dispatch('pathChange', stack);
                return stack;
            }, function(error) {
                console.warn(error.message);
            });
        }
    }

    public getOld(sectionId: string) {
        this.eventDispatcherService.dispatch('oldSectionChange', sectionId);
    }

    public getSettings(sectionId: string, stack: Array<any>) {
        let self = this,
            objectType = Model.SectionSettings,
            columnIndex = 1,
            parentContext = stack[columnIndex-1],
            context: any = {
                columnIndex: columnIndex,
                objectType: objectType,
                parentContext: parentContext,
                path: parentContext.path + '/section-settings/_/' + encodeURIComponent(sectionId)
            };
        return Promise.all([
            this.modelDescriptorService.getUiDescriptorForType(objectType)
        ]).spread((uiDescriptor) => {
            context.object = parentContext.object.settings;
            context.userInterfaceDescriptor = uiDescriptor;

            return self.updateStackWithContext(stack, context);
        });
    }
}
