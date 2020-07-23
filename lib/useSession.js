import Session from 'neo4j-driver/lib/session';

const useSession = (driverOptions, sessionOptions) => useDriver(driverOptions).session(sessionOptions);

const isSession = (obj) => obj instanceof Session;

export default useSession;

export {
  isSession
}
