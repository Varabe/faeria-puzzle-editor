class BackendError(Exception): pass
class CardError(BackendError): pass
class DatabaseError(BackendError): pass
class PropertyError(BackendError): pass