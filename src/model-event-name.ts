import {Model} from './model';
export class ModelEventName {
    public static AccountCategory = new ModelEventName(Model.AccountCategory);
    public static AccountSystem = new ModelEventName(Model.AccountSystem);
    public static Alert = new ModelEventName(Model.Alert);
    public static AlertEmitter = new ModelEventName(Model.AlertEmitter);
    public static AlertFilter = new ModelEventName(Model.AlertFilter);
    public static AlertSettings = new ModelEventName(Model.AlertSettings);
    public static AmazonS3Credentials = new ModelEventName(Model.AmazonS3Credentials);
    public static BootEnvironment = new ModelEventName(Model.BootEnvironment);
    public static Calendar = new ModelEventName(Model.Calendar);
    public static CalendarTask = new ModelEventName(Model.CalendarTask);
    public static CryptoCertificate = new ModelEventName(Model.CryptoCertificate);
    public static Database = new ModelEventName(Model.Database);
    public static Debug = new ModelEventName(Model.Debug);
    public static DetachedVolume = new ModelEventName(Model.DetachedVolume);
    public static Directory = new ModelEventName(Model.Directory);
    public static DirectoryserviceConfig = new ModelEventName(Model.DirectoryserviceConfig);
    public static DirectoryServices = new ModelEventName(Model.DirectoryServices);
    public static Disk = new ModelEventName(Model.Disk);
    public static DiskUsage = new ModelEventName(Model.DiskUsage);
    public static DockerCollection = new ModelEventName(Model.DockerCollection);
    public static DockerConfig = new ModelEventName(Model.DockerConfig);
    public static DockerContainer = new ModelEventName(Model.DockerContainer);
    public static DockerContainerBridge = new ModelEventName(Model.DockerContainerBridge);
    public static DockerContainerCreator = new ModelEventName(Model.DockerContainerCreator);
    public static DockerContainerLogs = new ModelEventName(Model.DockerContainerLogs);
    public static DockerContainerSection = new ModelEventName(Model.DockerContainerSection);
    public static DockerHost = new ModelEventName(Model.DockerHost);
    public static DockerImage = new ModelEventName(Model.DockerImage);
    public static DockerImageReadme = new ModelEventName(Model.DockerImageReadme);
    public static DockerImagePull = new ModelEventName(Model.DockerImagePull);
    public static DockerNetwork = new ModelEventName(Model.DockerNetwork);
    public static EncryptedVolumeActions = new ModelEventName(Model.EncryptedVolumeActions);
    public static EncryptedVolumeImporter = new ModelEventName(Model.EncryptedVolumeImporter);
    public static FreenasCredentials = new ModelEventName(Model.FreenasCredentials);
    public static Group = new ModelEventName(Model.Group);
    public static ImportableDisk = new ModelEventName(Model.ImportableDisk);
    public static Ipmi = new ModelEventName(Model.Ipmi);
    public static KerberosKeytab = new ModelEventName(Model.KerberosKeytab);
    public static KerberosRealm = new ModelEventName(Model.KerberosRealm);
    public static Mail = new ModelEventName(Model.AlertEmitterEmail);
    public static NetworkConfig = new ModelEventName(Model.NetworkConfig);
    public static NetworkHost = new ModelEventName(Model.NetworkHost);
    public static NetworkInterface = new ModelEventName(Model.NetworkInterface);
    public static NetworkInterfaceBridgeProperties = new ModelEventName(Model.NetworkInterfaceBridgeProperties);
    public static NetworkInterfaceLaggProperties = new ModelEventName(Model.NetworkInterfaceLaggProperties);
    public static NetworkInterfaceVlanProperties = new ModelEventName(Model.NetworkInterfaceVlanProperties);
    public static NetworkRoute = new ModelEventName(Model.NetworkRoute);
    public static NtpServer = new ModelEventName(Model.NtpServer);
    public static Peer = new ModelEventName(Model.Peer);
    public static Permissions = new ModelEventName(Model.Permissions);
    public static Replication = new ModelEventName(Model.Replication);
    public static ReplicationOptions = new ModelEventName(Model.ReplicationOptions);
    public static RsyncdModule = new ModelEventName(Model.RsyncdModule);
    public static Section = new ModelEventName(Model.Section);
    public static SectionSettings = new ModelEventName(Model.SectionSettings);
    public static Service = new ModelEventName(Model.Service);
    public static ServiceDc = new ModelEventName(Model.ServiceDc);
    public static ServiceDyndns = new ModelEventName(Model.ServiceDyndns);
    public static ServicesCategory = new ModelEventName(Model.ServicesCategory);
    public static ServiceUps = new ModelEventName(Model.ServiceUps);
    public static Share = new ModelEventName(Model.Share);
    public static SshCredentials = new ModelEventName(Model.SshCredentials);
    public static SupportCategory = new ModelEventName(Model.SupportCategory);
    public static SupportTicket = new ModelEventName(Model.SupportTicket);
    public static SystemAdvanced = new ModelEventName(Model.SystemAdvanced);
    public static SystemGeneral = new ModelEventName(Model.SystemGeneral);
    public static SystemSection = new ModelEventName(Model.SystemSection);
    public static SystemTime = new ModelEventName(Model.SystemTime);
    public static SystemUi = new ModelEventName(Model.SystemUi);
    public static Task = new ModelEventName(Model.Task);
    public static Tunable = new ModelEventName(Model.Tunable);
    public static Update = new ModelEventName(Model.Update);
    public static User = new ModelEventName(Model.User);
    public static Vm = new ModelEventName(Model.Vm);
    public static VmClone = new ModelEventName(Model.VmClone);
    public static VmConfig = new ModelEventName(Model.VmConfig);
    public static VmDatastore = new ModelEventName(Model.VmDatastore);
    public static VmDevice = new ModelEventName(Model.VmDevice);
    public static VmReadme = new ModelEventName(Model.VmReadme);
    public static VmSnapshot = new ModelEventName(Model.VmSnapshot);
    public static VmTemplate = new ModelEventName(Model.VmTemplate);
    public static VmVolume = new ModelEventName(Model.VmVolume);
    public static VmwareCredentials = new ModelEventName(Model.VmwareCredentials);
    public static VmwareDataset = new ModelEventName(Model.VmwareDataset);
    public static VmwareDatastore = new ModelEventName(Model.VmwareDatastore);
    public static Volume = new ModelEventName(Model.Volume);
    public static VolumeDataset = new ModelEventName(Model.VolumeDataset);
    public static VolumeDatasetProperties = new ModelEventName(Model.VolumeDatasetProperties);
    public static VolumeDatasetPropertyAtime = new ModelEventName(Model.VolumeDatasetPropertyAtime);
    public static VolumeDatasetPropertyCasesensitivity = new ModelEventName(Model.VolumeDatasetPropertyCasesensitivity);
    public static VolumeDatasetPropertyCompression = new ModelEventName(Model.VolumeDatasetPropertyCompression);
    public static VolumeDatasetPropertyDedup = new ModelEventName(Model.VolumeDatasetPropertyDedup);
    public static VolumeDatasetPropertyQuota = new ModelEventName(Model.VolumeDatasetPropertyQuota);
    public static VolumeDatasetPropertyRefquota = new ModelEventName(Model.VolumeDatasetPropertyRefquota);
    public static VolumeDatasetPropertyRefreservation = new ModelEventName(Model.VolumeDatasetPropertyRefreservation);
    public static VolumeDatasetPropertyReservation = new ModelEventName(Model.VolumeDatasetPropertyReservation);
    public static VolumeDatasetPropertyVolblocksize = new ModelEventName(Model.VolumeDatasetPropertyVolblocksize);
    public static VolumeImporter = new ModelEventName(Model.VolumeImporter);
    public static VolumeSnapshot = new ModelEventName(Model.VolumeSnapshot);
    public static VolumeVdevRecommendations = new ModelEventName(Model.VolumeVdevRecommendations);
    public static ZfsTopology = new ModelEventName(Model.ZfsTopology);
    public static ZfsVdev = new ModelEventName(Model.ZfsVdev);

    public listChange: string;
    public contentChange: string;
    public add: Function;
    public remove: Function;
    public change: Function;

    public constructor(modelName: string) {
        this.listChange = modelName + 'ListChange';
        this.contentChange = modelName + 'ContentChange';
        this.add = (id) => modelName + 'Add.' + id;
        this.remove = (id) => modelName + 'Remove.' + id;
        this.change = (id) => modelName + '.' + id;
    }
}
