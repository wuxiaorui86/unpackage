# The name of the extension.
extension_name := unpackage

# The UUID of the extension.
extension_uuid := {5b65531c-181c-11e0-9c47-001c259dab32}

# The name of the profile dir where the extension can be installed.
profile_dir := m6itouhc.default 

# The zip application to be used.
ZIP := zip

# The source location.
src_dir := ./src

SRC = src 

all:
	@for dir in $(SRC); do ${MAKE} $@ -C $$dir; exit_status=$$?; \
	if [ $$exit_status -ne 0 ]; then exit $$exit_status; fi; done
clean:
	@for dir in $(SRC); do ${MAKE} $@ -C $$dir; exit_status=$$?; \
	if [ $$exit_status -ne 0 ]; then exit $$exit_status; fi; done
install:
	@for dir in $(SRC); do ${MAKE} $@ -C $$dir; exit_status=$$?; \
	if [ $$exit_status -ne 0 ]; then exit $$exit_status; fi; done
