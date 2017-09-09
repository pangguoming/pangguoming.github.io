

	ThreeDEnvironment.projector=function onMouseMove( e ) {		
		ThreeDEnvironment.mouseVector.x = 2 * (e.clientX / containerWidth) - 1;
		ThreeDEnvironment.mouseVector.y = 1 - 2 * ( e.clientY / containerHeight );

		var raycaster = ThreeDEnvironment.projector.pickingRay( ThreeDEnvironment.mouseVector.clone(), camera ),
			intersects = raycaster.intersectObjects( cubes.children );
	
			var intersection = intersects[ 0 ],
				obj = intersection.object;
			obj.material.color.setRGB( 255, 0, 0 );
	}