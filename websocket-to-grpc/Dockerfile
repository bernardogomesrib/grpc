FROM container-registry.oracle.com/graalvm/native-image:21

RUN microdnf install -y maven && microdnf clean all

COPY pom.xml pom.xml
COPY src src

RUN mvn clean package -DskipTests
#RUN mvn clean package -DskipTests

#RUN native-image -J-Xmx4g -jar target/comunicaa-api-0.0.1-SNAPSHOT.jar
EXPOSE 8083

#RUN mvn clean package -DskipTests

#RUN mkdir -p /compilado && cp -r target/* /compilado/

#ENTRYPOINT ["target/comunicaa-api"]
#CMD ["/usr/lib64/graalvm/graalvm-java21/bin/java", "-agentlib:native-image-agent=config-output-dir=src/main/resources/META-INF/native-image/", "-jar", "target/comunicaa-api-0.0.1-SNAPSHOT.jar"]

ENTRYPOINT ["/usr/lib64/graalvm/graalvm-java21/bin/java",  "-jar", "target/websocket-to-grpc-0.0.1-SNAPSHOT.jar"]