  
  
				  ThreeDEnvironment.LoadAndAddObject=function (path)
				  { 		
					  //get the direction of camera
					  var pLocal = new THREE.Vector3( 0, 0, -1 );
					  var pWorld = pLocal.applyMatrix4( ThreeDEnvironment.camera.matrixWorld );
					  var dir = pWorld.sub( ThreeDEnvironment.camera.position ).normalize();
					  
					  // get the position in front of the camera
					  var distance=200;
					  var px=ThreeDEnvironment.camera.position.x+dir.x*distance;
					  var py=ThreeDEnvironment.camera.position.y+dir.y*distance;
					  var pz=ThreeDEnvironment.camera.position.z+dir.z*distance;
					  
					  ThreeDEnvironment.loader.load(path, function( geometry , materials ) {
					  var object = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
					  object.position.set(px, py, pz);
					 					  
					  ThreeDEnvironment.changelableobjs.add( object );
					  ThreeDEnvironment.objcontroller.attach( object );	
					  ThreeDEnvironment.focusobject=object;		
				  	  } );
			  }
			
			 ThreeDEnvironment.AddObject=function (object)
				  { 		
					  //get the direction of camera
					  var pLocal = new THREE.Vector3( 0, 0, -1 );
					  var pWorld = pLocal.applyMatrix4( ThreeDEnvironment.camera.matrixWorld );
					  var dir = pWorld.sub( ThreeDEnvironment.camera.position ).normalize();
					  
					  // get the position in front of the camera
					  var distance=200;
					  var px=ThreeDEnvironment.camera.position.x+dir.x*distance;
					  var py=ThreeDEnvironment.camera.position.y+dir.y*distance;
					  var pz=ThreeDEnvironment.camera.position.z+dir.z*distance;
					  
					  object.position.set(px, py, pz);
					 					  
					  ThreeDEnvironment.changelableobjs.add( object );
					  ThreeDEnvironment.objcontroller.attach( object );	
					  ThreeDEnvironment.focusobject=object;		
			  }